import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";

const geensJsSdk = require('../../assets/libraries/geens-js-sdk.umd.js');

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public sdk = new geensJsSdk(environment.geensSdkID, environment.geensSdkLoginRedirect, environment.geensServer, '');

    constructor(
        private http: HttpClient
    ) { }

    public login() {
        return new Promise((resolve) => {
            this.sdk.openLogin();

            this.sdk.onLogin( (code: string) => {
                this.sendGeensCode(code).subscribe((response: any) => {
                    this.sdk.finalizeLogin(response,
                        null,
                        false,
                        (success: any) => {
                            console.log(success)
                            // console.log(JSON.parse(localStorage.getItem('user_data') as string).id )
                            // this.loginPollDashboard(JSON.parse(localStorage.getItem('user_data') as string).id).subscribe((response) => {
                            resolve(true);
                            // })
                        },
                        (error: any) => {
                            console.log(error);
                        }
                    );
                })

            });
        });
    }

    public sendGeensCode(code: string) {
        return this.http.post<any>('/api/oauth/finalizeLogin', {code: code});
    }

    public loginPollDashboard(geensUserId: number) {
        let params: HttpParams = new HttpParams();
        params = params.append('geensUserId', String(geensUserId));

        return this.http.get<any>('/api/oauth/loginPoll', {params});
    }

    public isLoggedIn() {
        if (this.sdk.loggedIn) {
            return true;
        }

        return false;
    }

    public logout() {

        this.sdk.openLogout()
    }
}
