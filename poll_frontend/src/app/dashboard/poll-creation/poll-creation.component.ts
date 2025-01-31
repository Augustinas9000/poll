import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    FormArray,
    FormControl,
    FormGroup,
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from "@angular/forms";
import {Question} from "../../models/question";
import {PollService} from "../../services/poll.service";
import {PollAPIService} from "../../services/poll-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Voting} from "../../models/voting";
import {Outcome} from "../../models/outcome";

@Component({
  selector: 'app-poll-creation',
  templateUrl: './poll-creation.component.html',
  styleUrl: './poll-creation.component.sass'
})
export class PollCreationComponent implements OnInit, OnDestroy {
    private routeSub: Subscription;

    public pollFormGroup: UntypedFormGroup;
    public questionTypes = {
        TYPE_LIST_OF_ANSWERS: Question.$TYPE_LIST_OF_ANSWERS,
        TYPE_OPEN_QUESTION: Question.$TYPE_OPEN_QUESTION
    }

    public isAdvancedPoll = true;
    public accessCode: string;

    public originalPoll: Voting;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private pollAPIService: PollAPIService,
        private pollService: PollService,
        private router: Router,
        private route: ActivatedRoute,

    ) {
        this.pollFormGroup = this.advancedPollForm();
        this.isAdvancedPoll = true;
    }

    public advancedPollForm() {
        return this.formBuilder.group({
            accessCode: this.formBuilder.control('',[Validators.required]),
            name: this.formBuilder.control('',[Validators.required]),
            password: this.formBuilder.control('', [Validators.required]),
            questions: this.formBuilder.array([]),
            loginRequiredForVoters: this.formBuilder.control(false,[Validators.required]),
            snapVote: this.formBuilder.control(false,[Validators.required]),
            votersGeensIds: this.formBuilder.control('',[]),
            startMethod: this.formBuilder.control(1,[Validators.required]),
            closeMethod: this.formBuilder.control(1,[Validators.required]),
            displayMethod: this.formBuilder.control(1,[Validators.required]),

        });
    }

    public changeToSnapPoll() {
        this.isAdvancedPoll = false;

        this.pollFormGroup = this.snapPollForm();
        this.generatePollCode();
        this.prepareForGeneralQuestionAdding(this.questionsControls, Question.$TYPE_LIST_OF_ANSWERS);
    }
    public snapPollForm() {
         return this.formBuilder.group({
            accessCode: this.formBuilder.control('',[Validators.required]),
            name: this.formBuilder.control('',[Validators.required]),
            // password: this.formBuilder.control('', [Validators.required]),
            questions: this.formBuilder.array([]),
            // loginRequiredForVoters: this.formBuilder.control(false,[Validators.required]),
            snapVote: this.formBuilder.control(true,[Validators.required]),
            // votersGeensIds: this.formBuilder.control('',[]),
            startMethod: this.formBuilder.control(1,[Validators.required]),
            closeMethod: this.formBuilder.control(1,[Validators.required]),
            displayMethod: this.formBuilder.control(1,[Validators.required]),

        });
    }
    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.accessCode = params['accessCode'];
        });

        this.loadPollData();
        this.generatePollCode();
        this.generatePassword();
        if (!this.accessCode) {
            this.prepareForGeneralQuestionAdding(this.questionsControls, Question.$TYPE_LIST_OF_ANSWERS);
        }

        console.log(this.pollFormGroup);
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    public loadPollData() {
        if (this.accessCode) {
            this.pollAPIService.getPoll(this.accessCode).subscribe({
                next: (polls: Voting) => {
                    this.originalPoll = polls;
                    this.reusePollData(this.originalPoll);
                }
            });
        }
    }

    public createPoll() {
        if (!this.pollFormGroup.valid) return;

        const pollValues = this.pollFormGroup.value;
        pollValues.encrypted = false;

        this.pollAPIService.createPoll(this.pollFormGroup.value).subscribe({
            next: poll => {
                this.router.navigate(['dashboard/manage']).then();

            }, error: err => {
                console.log(err);
            }
        })
    }

    public removeQuestion(index: number) {
        this.questionsControls.removeAt(index);
    }

    public prepareForGeneralQuestionAdding(formQuestions: UntypedFormArray, type: number, addAtIndex: number|null = null) {

        const questionFormGroup = this.addQuestion(formQuestions, type);

        if (type === this.questionTypes.TYPE_LIST_OF_ANSWERS) {
            this.addOutcome(questionFormGroup.controls['outcomes'] as UntypedFormArray, 'Yes');
            this.addOutcome(questionFormGroup.controls['outcomes'] as UntypedFormArray, 'No');
        }

        if (addAtIndex || addAtIndex === 0) {
            this.questionsControls.insert(addAtIndex, questionFormGroup)
        } else {
            formQuestions.push(questionFormGroup);
        }
    }

    public addQuestion(formQuestions: UntypedFormArray, type: number, title = 'Title') {
        return this.formBuilder.group({
            id: this.formBuilder.control(formQuestions.value.length,[Validators.required]),
            title: this.formBuilder.control(title,[Validators.required]),
            type: this.formBuilder.control(type,[Validators.required]),
            outcomes: this.formBuilder.array([]),

        });
    }
    public addOutcome(questionOutcomeArray: UntypedFormArray, title: string) {
        const answerFormGroup = this.formBuilder.group({
            id: this.formBuilder.control(questionOutcomeArray.value.length,[Validators.required]),
            title: this.formBuilder.control(title,[Validators.required]),
        });
        questionOutcomeArray.push(answerFormGroup);
    }

    public changeQuestionType(questionId: number, type: number) {

        const index = this.questionsControls.value.findIndex((data: any) => data.id === questionId);
        this.questionsControls.removeAt(index);
        (this.questionsControls.controls as any).map((questionControl: FormGroup, index: number) => {
            questionControl.controls['id'].setValue(index);
        }); // resetting questions ids
        console.log(index);
        this.prepareForGeneralQuestionAdding(this.questionsControls, type, index)
    }

    get questionsControls() {
        return this.pollFormGroup.controls["questions"] as UntypedFormArray;
    }

    public generatePollCode() {
        this.pollFormGroup.controls["accessCode"].setValue(this.pollService.generateString(8, true))
    }
    public generatePassword() {
        this.pollFormGroup.controls["password"].setValue(this.pollService.generateString(8, false))
    }


    public getQuestionFormControl(questionId: number) {
        const index = this.questionsControls.value.findIndex((data: any) => data.id === questionId);
        return (this.questionsControls.at(index) as UntypedFormGroup).controls as any;
    }
    public getAnswerFormControl(questionId: number, outcomeId: number) {
        const questionControl = this.getQuestionFormControl(questionId);
        const index = questionControl.outcomes.value.findIndex((data: any) => data.id === outcomeId);
        return (questionControl['outcomes'].controls.at(index) as UntypedFormGroup).controls as any;
    }

    public getFormControl(key: string) {
        return this.pollFormGroup.controls[key] as FormControl;
    }


    public reusePollData(poll: Voting) {
        this.pollFormGroup.controls['name'].setValue(poll.name + '(copy)');
        // this.pollFormGroup.controls['questions'].patchValue(poll.questions);
        this.pollFormGroup.controls['loginRequiredForVoters'].setValue(poll.login_required);
        this.pollFormGroup.controls['snapVote'].setValue(poll.snap_vote);
        this.pollFormGroup.controls['votersGeensIds'].setValue(poll.allowed_voters);
        this.pollFormGroup.controls['startMethod'].setValue(poll.start_method);
        this.pollFormGroup.controls['closeMethod'].setValue(poll.close_method);
        this.pollFormGroup.controls['displayMethod'].setValue(poll.display_method);

        poll.questions?.map((question: Question) => {
            const questionFormGroup = this.addQuestion(this.questionsControls, question.type, question.title);

            (this.pollFormGroup.controls['questions'] as FormArray).push(questionFormGroup);

            question.outcomes?.map((outcome: Outcome) => {
                this.addOutcome(questionFormGroup.controls['outcomes'] as UntypedFormArray, outcome.title);
            });
        });

        console.log(this.pollFormGroup);
    }


}
