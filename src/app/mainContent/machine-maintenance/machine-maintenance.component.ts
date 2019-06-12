import {Component, OnDestroy, OnInit} from '@angular/core';
import {MaintenanceService} from '../../../services/maintenance.service';
import {BackflushingStatusEnum} from '../../../services/models/backflushing-status.enum';
import {MachineStatusService} from '../../../services/machine-status.service';
import {MachineStatusModel} from '../../../services/models/machine-status.model';
import {Subscription} from 'rxjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../../environments/environment';
import {BackendStatusEnum} from '../../../services/models/backend-status.enum';
import {BrewStatusEnum} from '../../../services/models/brew-status.enum';

@Component({
  selector: 'app-machine-maintenance',
  templateUrl: './machine-maintenance.component.html',
  styleUrls: ['./machine-maintenance.component.scss']
})
export class MachineMaintenanceComponent implements OnInit, OnDestroy {
    sockJS;

    // models
    _machineStatus: MachineStatusModel;

    // Subscriptions
    machineStatusSubscription: Subscription;
    maintenanceSubscription: Subscription;
    cancelMaintenanceSubscription: Subscription;

    // ui
    breakpoint: number;
    flushProgress: number;
    _backflushStatus: any = BackflushingStatusEnum;
    backflushingStatus: BackflushingStatusEnum;
    antiLimingStatus: BackflushingStatusEnum;

    constructor(private machineStatusService: MachineStatusService,
                private maintenanceService: MaintenanceService) { }

  ngOnInit() {
      this.backflushingStatus = BackflushingStatusEnum.NotFlushing;
      this.antiLimingStatus = BackflushingStatusEnum.NotFlushing;
      this.sockJS = new SockJS(`${environment.apiBaseUrl}:${environment.apiPort}${environment.sockJSBaseRef}`);
      const onMessageFunction: Function = function(e) {
          this._machineStatus = JSON.parse(e.data);
      };
      this.sockJS.onmessage = onMessageFunction.bind(this);
      this.breakpoint = (window.innerWidth <= 720) ? 1 : (window.innerWidth <= 1460) ? 2 : 4;
  }

    onResize(event) {
        this.breakpoint =
            this.breakpoint = (event.target.innerWidth <= 720) ? 1 : (event.target.innerWidth <= 1460) ? 2 : 4;
    }

    ngOnDestroy(): void {
        if (this.machineStatusSubscription) {
            this.machineStatusSubscription.unsubscribe();
        }
        if (this.maintenanceSubscription) {
            this.maintenanceSubscription.unsubscribe();
        }
    }

    startFlushing(): void {
        this.backflushingStatus = BackflushingStatusEnum.PendingForFlush;
        this.maintenanceSubscription = this.maintenanceService.startBackflashing().subscribe(() => {
            this.startFlushingCountdown();
        });
    }

    startAntiLiming(): void {
        this.antiLimingStatus = BackflushingStatusEnum.PendingForFlush;
        this.maintenanceSubscription = this.maintenanceService.startAntiLiming().subscribe(() => {
            this.startAntiLimingCountdown();
        });
    }

    cancelFlushing(): void {
        this.cancelMaintenanceSubscription = this.maintenanceService.cancelMaintenance().subscribe(() => {
            this.backflushingStatus = BackflushingStatusEnum.NotFlushing;
        });
    }

    private startFlushingCountdown(): void {
        this.backflushingStatus = BackflushingStatusEnum.Flushing;
        const timer: number = 171 / 100 * 1000;
        this.flushProgress = 0;
        let intervallID: number;
        const intervallFunction: any = function () {
            this.flushProgress = this.flushProgress + 1;
            if (this.flushProgress === 100) {
                this.backflushingStatus = BackflushingStatusEnum.NotFlushing;
                clearInterval(intervallID);
            }
        };
        intervallID = setInterval(intervallFunction.bind(this), timer);
    }

    private startAntiLimingCountdown(): void {
        this.antiLimingStatus = BackflushingStatusEnum.Flushing;
        const timer: number = 2895 / 100 * 1000;
        this.flushProgress = 0;
        let intervallID: number;
        const intervallFunction: any = function () {
            this.flushProgress = this.flushProgress + 1;
            if (this.flushProgress === 100) {
                this.backflushingStatus = BackflushingStatusEnum.NotFlushing;
                clearInterval(intervallID);
            }
        };
        intervallID = setInterval(intervallFunction.bind(this), timer);
    }
}
