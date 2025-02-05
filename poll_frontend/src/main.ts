import {bootstrapApplication, platformBrowser} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {AppModule} from "./app/app.module";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

platformBrowser().bootstrapModule(AppModule).then(r => {});
