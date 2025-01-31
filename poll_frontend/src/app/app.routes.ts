import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ModuleWithProviders} from "@angular/core";

const routes: Routes = [
    // {
    //     path: '',
    //     component: DashboardComponent,
    //     data: {name: 'solutions'}
    // },
    // {   path: '**',
    //     redirectTo: '/errors/404',
    //     data: {name: 'errors.404'}
    // },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },

];
export const AppRoutingModule: ModuleWithProviders<any> = RouterModule.forRoot(routes, {});

