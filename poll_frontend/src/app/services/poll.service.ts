import { Injectable } from '@angular/core';
import {Voting} from "../models/voting";

@Injectable({
    providedIn: 'root'
})
export class PollService {

    constructor() { }


    public generateString(length: number, upperCase: boolean) {
        let result = '';
        let characters = '';
        if (upperCase) {
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        } else {
            characters = 'abcdefghijklmnopqrstuvwxyz';
        }
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
}
