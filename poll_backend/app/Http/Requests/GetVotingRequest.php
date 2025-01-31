<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Voting;
use Carbon\Carbon;
use Auth;


class GetVotingRequest extends FormRequest
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

    public function getValidatorInstance()
    {
        $validator = parent::getValidatorInstance();

        $validator->after(function () use ($validator) {
            $voting = Voting::where('access_code', $this->access_code)->first();

            if (is_null($voting)) {
                $validator->errors()->add('poll_not_exists', 'Voting does not exist.');
            }
        });

        return $validator;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'access_code' => 'string'
        ];
    }
}
