import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Params, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url, route.queryParams);
    }

    checkLogin(url: string, params: Params, redirectWithParams:boolean = false): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['']);

        return false;
    }
}
