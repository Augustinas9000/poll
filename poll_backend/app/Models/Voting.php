<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;


class Voting extends \Eloquent
{
    protected $fillable = ["title", "access_code", "login_required", "user_id",
     "name", "snap_vote", "allowed_voters", "valid_time","display_time",
      "time_vote_started", "time_vote_stopped", "start_method", "close_method",
        "display_method", "encrypted", "password", "hashedOpenQuestion", "votes_count", "url_token"];

//    protected $dateFormat = "c";

    protected $casts = ["login_required" => "boolean", "snap_vote" => "boolean", "encrypted" => "boolean"];

    protected $date = ["time_vote_started", "time_vote_stopped"];

    const START_IMMEDIATELY = 1;
    const START_MANUALLY = 2;
    const START_AT_SPECIFIC_TIME = 3;

    const CLOSE_MANUALLY = 1;
    const CLOSE_AT_SPECIFIC_TIME = 2;
    const CLOSE_AFTER_SPECIFIC_INTERVAL = 3;

    const DISPLAY_NOT = 1;
    const DISPLAY_FOR_SPECIFIC_INTERVAL = 2;
    const DISPLAY_DURING_VOTING_AND_AFTER_FOR_SPECIFIC_INTERVAL = 3;

    public function questions() {
        return $this->hasMany('App\Models\Question');
    }

//    public function tickets() {
//        return $this->hasMany('App\Ticket');
//    }

    public function user() {
        return $this->hasOne('App\Models\User');
    }

    public function getVotingTimeStarted() {
        $this->time_vote_started;
    }

    public function getVotingTimeStopped() {
        $this->time_vote_stopped;
    }

    public function getAllowedVoters() {

        return explode(',', $this->allowed_voters);
    }

    public static function updateDateTimes($data) {
        switch ($data['startMethod']) {
            case Voting::START_IMMEDIATELY:
                $data['timeVoteStarted'] = Carbon::now();
                break;
            case Voting::START_MANUALLY:
                $data['timeVoteStarted'] = null;
                break;
            case Voting::START_AT_SPECIFIC_TIME:
                $data['timeVoteStarted'] = Carbon::parse($data['timeVoteStarted']);
                break;
        }

        switch ($data['closeMethod']) {
            case Voting::CLOSE_MANUALLY:
                $data['timeVoteStopped'] = null;
                $data['validTime'] = null;
                break;
            case Voting::CLOSE_AFTER_SPECIFIC_INTERVAL:
                if ($data['timeVoteStarted']) {
                    $data['timeVoteStopped'] = Carbon::parse($data['timeVoteStopped']);
                }
                break;
            case Voting::CLOSE_AT_SPECIFIC_TIME:
                $data['timeVoteStopped'] = Carbon::parse($data['timeVoteStopped']);
                $data['validTime'] = null;
                break;
        }

        switch ($data['displayMethod']) {
            case Voting::DISPLAY_NOT:
                $data['displayTime'] = null;
                break;
        }

        return $data;
    }

}
