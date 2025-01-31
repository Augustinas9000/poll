<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Response;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;

class OAuthController extends Controller {

    public function loginPoll(Request $request) {
        $user = User::where('geens_user_id', $request->get('geensUserId'))->first();
//        \Auth::login($user);
//        \Session::put('login', true);

//
//        dump(\Session::has('login'));
//        dump(\Auth::check());
        dump(Auth::user());
        return [];
    }

    public function login(Request $request) {
//        \Auth::logout();
        $code = $request->get('code');

        $access_token_data = $this->getAccessToken($code);

        $user_data = $this->getUserData($access_token_data->access_token);
        $user = User::where('geens_uid', $user_data->uid)->first();

//        \Session::put('rsa_public', $user_data->rsa_public);
//        \Session::put('rsa_private', $request->get('private'));

        if (is_null($user)) {
            $user = User::create([
                "email" => $user_data->email,
                "geens_user_id" => $user_data->id,
                "geens_uid" => $user_data->uid,
                "password" => '',
            ]);
        } else {
            $user['email'] = $user_data->email;
            $user->save();
        }


        Auth::login($user);


        \Session::put('logout', false);
        \Session::put('login', true);

//        dump($request);
        return Response::json(["access_token" => $access_token_data->access_token]);
    }

    private function getAccessToken($code) {
        try {
            $url = env('GEENS_URL_INNER').'/api/oauth/access_token';
            $client_id = env('GEENS_ID');
            $client_secret = env('GEENS_SECRET');
            $redirect_uri = env('GEENS_URL_REDIRECT');

            $data = [
                'grant_type'    => 'authorization_code',
                'client_id'     => $client_id,
                'client_secret' => $client_secret,
                'redirect_uri'  => $redirect_uri,
                'code'          => $code
            ];

            $client = new Client();
            $res = $client->request('POST', $url, [
                'form_params' => $data
            ])->getBody();
            return json_decode($res);
        } catch (RequestException $e) {
            //dump($e->getRequest());
            if ($e->hasResponse()) {
                //dump($e->getResponse());
                return "Error";
            }
        }

    }


    private function getUserData($access_token) {
        try {
            $url = env('GEENS_URL_INNER').'/api/oauth/user_credentials';
            $client = new Client();
            $res = $client->request('POST', $url, [
                'form_params' => [
                    'access_token' => $access_token
                ]
            ])->getBody();

            return json_decode($res);
        } catch (RequestException $e) {
            //dump($e->getRequest());
            if ($e->hasResponse()) {
                //dump($e->getResponse());
                return "Error2";
            }
        }
    }

}
