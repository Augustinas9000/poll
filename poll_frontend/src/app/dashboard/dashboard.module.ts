import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard.component";
import {UsersRoutingModule} from "./users/users-routing.module";
import { HeaderComponent } from './header/header.component';
import {MatButton} from "@angular/material/button";
import { PollCreationComponent } from './poll-creation/poll-creation.component';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatOption, MatSelect} from "@angular/material/select";
import { MyPollsComponent } from './my-polls/my-polls.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import { PollSettingsComponent } from './poll-settings/poll-settings.component';
import { PollVotingComponent } from './poll-voting/poll-voting.component';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        DashboardComponent,
        HeaderComponent,
        PollCreationComponent,
        MyPollsComponent,
        ConfirmationDialogComponent,
        PollSettingsComponent,
        PollVotingComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        UsersRoutingModule,
        MatButton,
        MatFormField,
        MatInput,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatMenu,
        MatMenuItem,
        MatMenuTrigger,
        MatSlideToggle,
        MatSelect,
        MatOption,
        MatDialogActions,
        MatDialogTitle,
        MatDialogContent,
        MatIcon,
        MatRadioGroup,
        MatRadioButton,
        SharedModule
    ]
})
export class DashboardModule { }
