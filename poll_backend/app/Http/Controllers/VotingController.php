<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateVotingRequest;
use App\Http\Requests\GetVotingRequest;
use App\Http\Requests\StartVotingRequest;
use App\Http\Requests\StopVotingRequest;
use App\Models\Outcome;
use App\Models\Question;
use App\Models\User;
use App\Models\Voting;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Response;
use DB;

class VotingController extends Controller
{

    public function getPolls(Request $request) {
        $user = Auth::user();

        $polls = Voting::where('user_id', $user->id)->get();

        return $polls;
    }

    public function createVoting(CreateVotingRequest $request) {
        $user = Auth::user();
        $data = $request->get('formData');

        return DB::transaction(function () use ($request, $user, $data) {

            $data = Voting::updateDateTimes($data);

            $voting = Voting::create([
                'access_code' => $data['accessCode'],
                'name' => $data['name'],
                'encrypted' => $data['encrypted'],
                'login_required' => isset($data['loginRequiredForVoters']) ? $data['loginRequiredForVoters'] : false,
                'password' => isset($data['password']) ? $data['password'] : null,
                'snap_vote' => $data['snapVote'],
                'url_token' => isset($data['url_token']) ? $data['url_token'] : null,
                'user_id' => $user->id,
                'time_vote_started' => isset($data['timeVoteStarted']) ? $data['timeVoteStarted'] : null,
                'time_vote_stopped' => isset($data['timeVoteStopped']) ? $data['timeVoteStopped'] : null,
                'allowed_voters' => isset($data['allowedVoters']) ? $data['allowedVoters'] : null,
                'valid_time' => isset($data['validTime']) ? $data['validTime'] : null,
                'display_time' => isset($data['displayTime']) ? $data['displayTime'] : null,
                'start_method' => $data['startMethod'],
                'close_method' => $data['closeMethod'],
                'display_method' => $data['displayMethod']
            ]);

            foreach ($data['questions'] as $questionRequest) {
                $question = Question::create([
                    'title' => $questionRequest['title'],
                    'position' => $questionRequest['id'],
                    'type' => $questionRequest['type'],
                    'voting_id' => $voting->id
                ]);
                foreach ($questionRequest['outcomes'] as $outcomeRequest) {
                    Outcome::create([
                        'title' => $outcomeRequest['title'],
                        'position' => $outcomeRequest['id'],
                        'question_id' => $question->id
                    ]);
                }
            }
//dump($voting);
//            return $voting;
            return Response::json($voting);
        });
    }

    public function startVoting(StartVotingRequest $request) {
        $voting = Voting::where('id', $request->get('id'))->first();

        $voting->time_vote_started = Carbon::now();

        if (!is_null($voting->valid_time)) {
            $voting->time_vote_stopped = Carbon::now()->addMinutes($voting->valid_time);
        }
        $voting->save();

        return $voting;
    }

    public function stopVoting(StopVotingRequest $request) {
        $voting = Voting::where('id', $request->get('id'))->first();

        $voting->time_vote_stopped = Carbon::now();

        $voting->save();

        return $voting;
    }

    public function get(GetVotingRequest $request) {

        $voting = Voting::with(['questions'=> function($q){
            $q->orderBy('position');
        } , 'questions.outcomes'=> function($q){
            $q->orderBy('position');
        }])
//, 'questions.upload', 'questions.upload.chunks'])
            ->where('access_code', $request->access_code)->first();

        return $voting;
    }

}
