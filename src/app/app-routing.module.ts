import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MachineStatusComponent} from './mainContent/machine-status/machine-status.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {AutoStartTimeplanComponent} from './mainContent/auto-start-timeplan/auto-start-timeplan.component';
import {MachineMaintenanceComponent} from './mainContent/machine-maintenance/machine-maintenance.component';

const routes: Routes = [
    { path: 'status', component: MachineStatusComponent },
    { path: 'startTimeplan', component: AutoStartTimeplanComponent },
    { path: 'maintenance', component: MachineMaintenanceComponent },
    { path: '',
        redirectTo: '/status',
        pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
