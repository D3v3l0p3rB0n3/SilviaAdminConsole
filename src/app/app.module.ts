import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { TimeAgoPipe } from './shared/time-ago-pipe/time-ago.pipe';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {BrewService} from '../services/brew.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {APP_ROUTING} from './app-routing.module';
import {MaintenanceService} from '../services/maintenance.service';

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
      APP_ROUTING,
      MatSliderModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatProgressSpinnerModule,
      MatExpansionModule,
      BrowserModule,
      MatButtonModule,
      MatSlideToggleModule,
      MatGridListModule,
      MatIconModule,
      MatSidenavModule,
      MatToolbarModule,
      MatCardModule,
      LayoutModule,
      MatListModule,
      MatProgressBarModule,
      ScrollingModule
  ],
  providers: [
      MachineStatusService,
      BrewService,
      MaintenanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
