import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MachineStatusComponent} from './mainContent/machine-status/machine-status.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'machineStatus', component: MachineStatusComponent },
    { path: '',
        redirectTo: '/machineStatus',
        pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
