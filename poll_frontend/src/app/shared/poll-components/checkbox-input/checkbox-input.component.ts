import {Component, Input} from '@angular/core';
import {FormControl, UntypedFormArray, UntypedFormGroup} from "@angular/forms";

@Component({
    selector: 'app-checkbox-input',
    templateUrl: './checkbox-input.component.html',
    styleUrl: './checkbox-input.component.sass'
})
export class CheckboxInputComponent {

    @Input() questionControl: FormControl|any;


    constructor() {

    }

    public getOutcomeControls(question: UntypedFormGroup|any) {
        // console.log(question.controls.outcomes.controls);
        return question.controls.outcomes as UntypedFormArray;
    }

    public onCheckboxChange(e: any, outcomeControl: FormControl|any): void{
        const checkArray: any = this.questionControl.controls.value;

        if (e.target.checked) {
            checkArray.setValue(checkArray.value.concat(e.target.value));
        } else {
            const index = checkArray.value.indexOf(e.target.value, 0);
            if (index > -1) {
                checkArray.value.splice(index, 1);
                this.questionControl?.controls.value.setValue(checkArray.value);
            }
        }
        console.log(this.questionControl);
    }

}
