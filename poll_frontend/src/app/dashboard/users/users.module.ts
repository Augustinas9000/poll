import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {UserLoginComponent} from "./user-login/user-login.component";


@NgModule({
    declarations: [
        UserLoginComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,

    ]
})
export class UsersModule { }
