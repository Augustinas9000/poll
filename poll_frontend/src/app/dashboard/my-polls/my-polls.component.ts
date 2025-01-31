import {Component, OnInit} from '@angular/core';
import {PollAPIService} from "../../services/poll-api.service";
import {Voting} from "../../models/voting";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-my-polls',
    templateUrl: './my-polls.component.html',
    styleUrl: './my-polls.component.sass'
})
export class MyPollsComponent implements OnInit {

    public polls: Voting[] = [];

    constructor(
        public pollAPIService: PollAPIService,
        private dialog: MatDialog,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.pollAPIService.getPollsList().subscribe((polls: Voting[]) => {
            this.polls = polls;
            console.log(polls)
        });
    }


    public startPoll(event: any, poll: Voting) {
        (event.source as any).checked = !(event.source as any).checked; // resetting slide toggle

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '550px', hasBackdrop: true,
            data: {
                title: 'Start poll ' + poll.name,
                body: 'Are you sure you want to start the poll?'
            }
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                this.pollAPIService.startPoll(poll.id as number).subscribe((updatedPoll: Voting) => {
                    poll.time_vote_started = updatedPoll.time_vote_started;
                    poll.time_vote_stopped = updatedPoll.time_vote_stopped;
                });
            }
        });
    }

    public stopPoll(event: any, poll: Voting) {
        (event.source as any).checked = !(event.source as any).checked; // resetting slide toggle

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '550px', hasBackdrop: true,
            data: {
                title: 'Stop poll ' + poll.name,
                body: 'Are you sure you want to stop the poll?'
            }
        });
        dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                this.pollAPIService.stopPoll(poll.id as number).subscribe((updatedPoll: Voting) => {
                    poll.time_vote_stopped = updatedPoll.time_vote_stopped;
                });
            }
        });
    }

    public navigate(route: string, accessCode: string) {
        route = route + '/' + accessCode;
        this.router.navigate([route]).then();
    }


}
