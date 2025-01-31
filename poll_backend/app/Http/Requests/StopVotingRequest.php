<?php

namespace App\Http\Requests;

use App\Models\Voting;
use \Carbon\Carbon;
use Auth;
use Illuminate\Foundation\Http\FormRequest;


class StopVotingRequest extends FormRequest
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
            'id' => 'required|integer'
        ];
    }

    public function getValidatorInstance()
    {
        $validator = parent::getValidatorInstance();

        $validator->after(
            function() use ($validator) {
                // Test validation date.
                $voting = Voting::where('id', $this->get('id'))->first();

                if (!$voting) {
                    $validator->errors()->add('error', 'Not found');
                    return null;
                }

                if ($voting->user_id != Auth::user()->id) {
                    $validator->errors()->add('error', 'Not allowed to access this poll');
                    return null;
                }

                if (is_null($voting)) {
                    $validator->errors()->add('errors', 'Voting does not exist anymore');
                } else if (is_null($voting->time_vote_started)) {
                    $validator->errors()->add('errors', "Voting not yet started");
                } else if (!is_null($voting->time_vote_stopped)) {
                    if (Carbon::parse($voting->time_vote_stopped)->lt(Carbon::now())) {
                        $validator->errors()->add('errors', 'Voting has already stopped');
                    }
                }

                return null;
            });

        return $validator;
    }

}
