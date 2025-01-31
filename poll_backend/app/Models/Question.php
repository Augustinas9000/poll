<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ["title", "position", "type", "voting_id"];

    const TYPE_LIST_OF_ANSWERS = 1;
    const TYPE_OPEN_QUESTION = 2;

    public function outcomes() {
        return $this->hasMany('App\Models\Outcome');
    }

//    public function votes() {
//        return $this->hasMany('App\Vote');
//    }
//
//    public function upload() {
//        return $this->hasOne('App\Upload');
//    }
}
