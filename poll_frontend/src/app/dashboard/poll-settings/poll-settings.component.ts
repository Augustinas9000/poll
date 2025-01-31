import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {PollAPIService} from "../../services/poll-api.service";
import {Voting} from "../../models/voting";

@Component({
    selector: 'app-poll-settings',
    templateUrl: './poll-settings.component.html',
    styleUrl: './poll-settings.component.sass'
})
export class PollSettingsComponent implements OnInit, OnDestroy {
    private routeSub: Subscription;

    public accessCode: string;
    public poll: Voting;

    constructor(
        private route: ActivatedRoute,
        public pollAPIService: PollAPIService,
        private router: Router,

    ) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.accessCode = params['accessCode'];
        });
        this.loadPollData();
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    public loadPollData() {
        if (this.accessCode) {
            this.pollAPIService.getPoll(this.accessCode).subscribe((polls: Voting) => {
                this.poll = polls;
            });
        }
    }

    public copyPoll() {
        let route = 'dashboard/create/' + this.accessCode;

        this.router.navigate([route]).then();
    }

}
