import {Component, Input} from '@angular/core';
import {FormControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-radio-button-input',
  templateUrl: './radio-button-input.component.html',
  styleUrl: './radio-button-input.component.sass'
})
export class RadioButtonInputComponent {

    @Input() questionControl: FormControl|any;


    constructor(
        private formBuilder: UntypedFormBuilder,

    ) {

    }

    public getOutcomeControls(question: UntypedFormGroup|any) {
        // console.log(question.controls.outcomes.controls);
        return question.controls.outcomes as UntypedFormArray;
    }

    public onCheckboxChange(e: any, outcomeControl: FormControl|any): void{
        const checkArray: any = this.questionControl.controls.value;

        if (e.checked) {
            // const valueControl = new FormControl(e.source.value);
            // (checkArray as UntypedFormArray).push(valueControl);
            checkArray.setValue(checkArray.value.concat(e.source.value));
        } else {
            const index = checkArray.value.indexOf(e.source.value, 0);
            if (index > -1) {
                checkArray.value.splice(index, 1);
                this.questionControl?.controls.value.setValue(checkArray.value);
            }
        }
        console.log(this.questionControl);
    }

}
