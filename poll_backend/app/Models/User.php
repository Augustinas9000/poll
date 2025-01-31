<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'geens_uid',
        'geens_user_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
    ];

//    public function getAuthIdentifierName()
//    {
//        // TODO: Implement getAuthIdentifierName() method.
//    }
//
//    public function getAuthIdentifier()
//    {
//        // TODO: Implement getAuthIdentifier() method.
//    }
//
//    public function getAuthPassword()
//    {
//        // TODO: Implement getAuthPassword() method.
//    }
//
//    public function getRememberToken()
//    {
//        // TODO: Implement getRememberToken() method.
//    }
//
//    public function setRememberToken($value)
//    {
//        // TODO: Implement setRememberToken() method.
//    }
//
//    public function getRememberTokenName()
//    {
//        // TODO: Implement getRememberTokenName() method.
//    }
}
