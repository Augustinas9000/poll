import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxInputComponent } from './poll-components/checkbox-input/checkbox-input.component';
import { TextInputComponent } from './poll-components/text-input/text-input.component';
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import { RadioButtonInputComponent } from './poll-components/radio-button-input/radio-button-input.component';
import {MatCheckbox} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        CheckboxInputComponent,
        TextInputComponent,
        RadioButtonInputComponent
    ],
    exports: [
        CheckboxInputComponent,
        RadioButtonInputComponent
    ],
    imports: [
        CommonModule,
        MatRadioButton,
        MatRadioGroup,
        MatCheckbox,
        ReactiveFormsModule
    ]
})
export class SharedModule { }
