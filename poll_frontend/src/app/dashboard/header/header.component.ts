import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    public navigate(route: string) {
        this.router.navigate([route]).then();
    }

    public logout() {
        this.authService.logout();
    }

}
