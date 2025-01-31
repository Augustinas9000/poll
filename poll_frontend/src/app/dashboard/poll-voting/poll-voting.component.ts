import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Voting} from "../../models/voting";
import {ActivatedRoute, Router} from "@angular/router";
import {PollAPIService} from "../../services/poll-api.service";
import {
    AbstractControl,
    FormControl,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from "@angular/forms";
import {Question} from "../../models/question";
import {Outcome} from "../../models/outcome";

@Component({
    selector: 'app-poll-voting',
    templateUrl: './poll-voting.component.html',
    styleUrl: './poll-voting.component.sass'
})
export class PollVotingComponent implements OnInit, OnDestroy {
    private routeSub: Subscription;

    public accessCode: string;
    public poll: Voting;
    public pollFormGroup: UntypedFormGroup;
    public formIsLoaded = false;

    public QUESTION_TYPES = {
        TYPE_LIST_OF_ANSWERS: Question.$TYPE_LIST_OF_ANSWERS,
        TYPE_OPEN_QUESTION: Question.$TYPE_OPEN_QUESTION,
    }

    constructor(
        private route: ActivatedRoute,
        public pollAPIService: PollAPIService,
        private router: Router,
        private formBuilder: UntypedFormBuilder,

    ) {
        this.pollFormGroup = this.pollFillingFormFormGroup();

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
            this.pollAPIService.getPoll(this.accessCode).subscribe((poll: Voting) => {
                this.poll = poll;

                this.preparePollData();
            });
        }
    }

    public preparePollData() {
        this.poll.questions?.map((question: Question) => {

            const questionControl: UntypedFormGroup = this.formBuilder.group({
                title: this.formBuilder.control(question.title,[Validators.required]),
                id: this.formBuilder.control(question.id,[Validators.required]),
                type: this.formBuilder.control(question.type,[Validators.required]),
                value: this.formBuilder.control([],[Validators.required]),
                outcomes: this.formBuilder.array([],[Validators.required]),
            });

            // const valueControl = new FormControl();
            // (questionControl.controls['value'] as UntypedFormArray).push(valueControl);


            // const valueControl: UntypedFormGroup = this.formBuilder.group({
            //     id: this.formBuilder.control('',[Validators.required]),
            // });
            // (questionControl.controls['value'] as UntypedFormArray).push(valueControl);

            question.outcomes?.map((outcome: Outcome) => {
                const outcomeControl: UntypedFormGroup = this.formBuilder.group({
                    title: this.formBuilder.control(outcome.title,[Validators.required]),
                    type: this.formBuilder.control(outcome.type,[Validators.required]),
                    id: this.formBuilder.control(outcome.id,[Validators.required]),
                });

                (questionControl.controls['outcomes'] as UntypedFormArray).push(outcomeControl);
            })

            this.questionsControls.push(questionControl);
        });
        console.log(this.pollFormGroup);
        console.log(this.questionsControls);

        this.formIsLoaded = true;

    }

    get questionsControls() {
        return this.pollFormGroup.controls["questions"] as UntypedFormArray;
    }


    public getOutcomeControls(question: UntypedFormGroup|any) {
        // console.log(question.controls.outcomes.controls);
        return question.controls.outcomes as UntypedFormArray;
    }

    public addQuestion() {

    }

    public pollFillingFormFormGroup() {
        return this.formBuilder.group({
            questions: this.formBuilder.array([]),

        });
    }

}
