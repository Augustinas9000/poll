<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Outcome extends Model
{
    protected $fillable = ["title", "position", "question_id", "type"];
}
