import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {PollCreationComponent} from "./poll-creation/poll-creation.component";
import {AuthGuardService} from "../services/auth-guard.service";
import {MyPollsComponent} from "./my-polls/my-polls.component";
import {PollSettingsComponent} from "./poll-settings/poll-settings.component";
import {PollVotingComponent} from "./poll-voting/poll-voting.component";

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'dashboard',
            component: DashboardComponent,
            data: {title: 'Poll'},
            children: [
                {
                    path: 'create',
                    component: PollCreationComponent,
                    canActivate: [AuthGuardService],
                },
                {
                    path: 'create/:accessCode',
                    component: PollCreationComponent,
                    canActivate: [AuthGuardService],
                },
                {
                    path: 'manage',
                    component: MyPollsComponent,
                    canActivate: [AuthGuardService],
                },
                {
                    path: 'settings/:accessCode',
                    component: PollSettingsComponent,
                    canActivate: [AuthGuardService],
                },
                {
                    path: 'voting/:accessCode',
                    component: PollVotingComponent,
                    canActivate: [],
                }
            ]
        }
    ])],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
