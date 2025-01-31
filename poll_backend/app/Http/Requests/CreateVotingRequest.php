<?php

namespace App\Http\Requests;

use App\Models\Voting;

use Illuminate\Foundation\Http\FormRequest;

class CreateVotingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'formData' => '',
            'formData.accessCode' => 'string|required',
            'formData.name' => 'max:573|required',
            'formData.password' => 'max:573',
            'formData.snapVote' => 'required',
            'formData.questions.*.title' => 'max:573|required',
            'formData.questions.*.outcomes.*.title' => 'max:573|required'
        ];
    }

    public function getValidatorInstance()
    {
        $validator = parent::getValidatorInstance();

        $validator->after(function() use ($validator) {
            if(count($validator->errors()) == 0) {  //only when 'rules' errors 0

                $data = $this->get('formData');

                $voting = Voting::where('access_code', $data['accessCode'])->first();


                if ($voting) {
                    $validator->errors()->add('poll_exists', 'Poll already exists');
                }


                if ($data['startMethod'] === Voting::START_AT_SPECIFIC_TIME && !$data['timeVoteStarted']) {
                    $validator->errors()->add("begin_date_required", "Poll start date can't be empty");
                }

                if ($data['closeMethod'] === Voting::CLOSE_AT_SPECIFIC_TIME && !$data['timeVoteStopped']) {
                    $validator->errors()->add("end_date_required", "Poll end date can't be empty");
                }

                if ($data['closeMethod'] === 3) {
                    if ($data['validTime'] < 1) {
                        $validator->errors()->add('wrong_close_voting_time', 'Voting close time has to be more than 0 minutes');
                    }
                }

                if (!$data['encrypted']) {
                    if (strlen($data['name']) > 180) {
                        $validator->errors()->add('poll_name_too_long', 'Poll name is too long');
                    }
                    foreach ($data['questions'] as $question) {
                        if (strlen($question['title']) > 180) {
                            $validator->errors()->add('poll_question_name_too_long', 'Poll question name is too long');
                        }
                    }
                }

                if ($data['displayMethod'] === 2 || $data['displayMethod'] === 3) {
                    if ($data['displayTime'] < 1) {
                        $validator->errors()->add('wrong_display_time', 'Display time has to be more than 0 minutes');
                    }
                }
                return null;
            }
        });

        return $validator;
    }

}
