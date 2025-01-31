import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardModule} from "./dashboard/dashboard.module";
import {AppComponent} from "./app.component";
import {provideRouter, RouterModule, RouterOutlet} from '@angular/router';
import {AppRoutingModule} from "./app.routes";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        DashboardModule,
        BrowserModule,
        RouterOutlet,
        AppRoutingModule,
        HttpClientModule
        // RouterModule
        // RouterModule.forRoot(routes)
    ],
    providers: [
        HttpClientModule,
        provideAnimationsAsync()
    ],
    bootstrap: [
        AppComponent
    ]

})
export class AppModule { }
