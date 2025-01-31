import { Component } from '@angular/core';
import {provideRouter, RouterModule} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    // imports: [RouterModule],
    // standalone: true,
    styleUrl: './app.component.sass'
})
export class AppComponent {

    title = 'poll_frontend';

    constructor() {
    }
}
