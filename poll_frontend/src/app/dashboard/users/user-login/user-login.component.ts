import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../services/auth.service";
// import {default as geensJsSdk} from 'geens-js-sdk';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrl: './user-login.component.sass'
})
export class UserLoginComponent implements OnInit{

    public embedded: boolean = false;
    constructor(
        private route: ActivatedRoute,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.route.queryParams.forEach((params: Params) => {
            if (params['embedded']) {
                this.embedded = true;
                parent.postMessage({loaded: true}, window.location.origin);
            }
        });
    }

    public login() {

        this.authService.login().then(
            (success: any) => {
                parent.postMessage({
                            success: true,
                        },
                        window.location.origin
                    );
            }
        );

    }


}
