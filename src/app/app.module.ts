import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {MatListModule} from '@angular/material/list';
import { MachineStatusComponent } from './mainContent/machine-status/machine-status.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AutoStartTimeplanComponent } from './mainContent/auto-start-timeplan/auto-start-timeplan.component';
import { MachineMaintenanceComponent } from './mainContent/machine-maintenance/machine-maintenance.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MachineStatusService} from '../services/machine-status.service';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CountdownModule} from 'ngx-countdown';
import { TimeAgoPipe } from './shared/time-ago-pipe/time-ago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    MachineStatusComponent,
    PageNotFoundComponent,
    AutoStartTimeplanComponent,
    MachineMaintenanceComponent,
    TimeAgoPipe
  ],
  imports: [
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatProgressSpinnerModule,
      CountdownModule,
      BrowserModule,
      MatButtonModule,
      MatGridListModule,
      MatIconModule,
      MatSidenavModule,
      MatToolbarModule,
      LayoutModule,
      MatListModule
  ],
  providers: [
      MachineStatusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
