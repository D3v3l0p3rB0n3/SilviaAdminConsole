import {Component, OnDestroy, OnInit} from '@angular/core';
import {MachineStatusService} from '../../../services/machine-status.service';
import {Subscription} from 'rxjs';
import {MachineStatusModel} from '../../../services/models/machine-status.model';
import {BackendStatusEnum} from '../../../services/models/backend-status.enum';
import {MatSlideToggleChange} from '@angular/material';
import {BrewService} from '../../../services/brew.service';
import {BrewStatusEnum} from '../../../services/models/brew-status.enum';
import {MaintenanceService} from '../../../services/maintenance.service';

@Component({
  selector: 'app-machine-status',
  templateUrl: './machine-status.component.html',
  styleUrls: ['./machine-status.component.scss']
})
export class MachineStatusComponent implements OnInit, OnDestroy {
  // models
  _machineStatus: MachineStatusModel;

  // Subscriptions
  machineStatusSubscription: Subscription;
  setMachineStatusSubscription: Subscription;
  startBrewingSubscription: Subscription;

  // ui
  _backendStatus: any = BackendStatusEnum;
  _brewStatus: any = BrewStatusEnum;
  machineStatusStatus: BackendStatusEnum;
  brewCoffeeStatus: BrewStatusEnum;
  brewProgress: number;
  breakpoint: number;

  constructor(private machineStatusService: MachineStatusService,
              private brewService: BrewService,
              private maintenanceService: MaintenanceService) {}

  ngOnInit() {
    this.machineStatusSubscription = this.machineStatusService.getMachineStatus().subscribe((machineStatus: MachineStatusModel) => {
      if (machineStatus) {
          this._machineStatus = machineStatus;
          this.machineStatusStatus = BackendStatusEnum.SUCCESS;
      }
    });
    this.machineStatusStatus = BackendStatusEnum.LOADING;
    this.brewCoffeeStatus = BrewStatusEnum.NotBrewing;
      this.breakpoint = (window.innerWidth <= 720) ? 1 : (window.innerWidth <= 1460) ? 2 : 4;
  }

  ngOnDestroy(): void {
      this.machineStatusSubscription.unsubscribe();
      this.setMachineStatusSubscription.unsubscribe();
      this.startBrewingSubscription.unsubscribe();
  }

  switchMachineStatus(): void {
    this.setMachineStatusSubscription = this.machineStatusService.setMachineStatus().subscribe((machineStatus: MachineStatusModel) => {
        if (machineStatus) {
            this._machineStatus = machineStatus;
            this.machineStatusStatus = BackendStatusEnum.SUCCESS;
        }
        if (!machineStatus.machineEnabled) {
            this.brewCoffeeStatus = BrewStatusEnum.NotBrewing;
        }
    });
  }

  brewCoffee(brewTime: number): void {
      this.brewCoffeeStatus = BrewStatusEnum.PendingForBrew;
      this.startBrewingSubscription = this.brewService.startBrewing(brewTime).subscribe(() => {
          this.startBrewCountdown(brewTime);
      });
  }

  cancelBrewCoffee(): void {
      this.startBrewingSubscription = this.brewService.cancelBrewing().subscribe(() => {
          this.brewCoffeeStatus = BrewStatusEnum.NotBrewing;
      });
  }

  private startBrewCountdown(brewTime: number): void {
      this.brewCoffeeStatus = BrewStatusEnum.Brewing;
      const timer: number = brewTime / 100 * 1000;
      this.brewProgress = 0;
      let intervallID: number;
      const intervallFunction: any = function () {
          this.brewProgress = this.brewProgress + 1;
          if (this.brewProgress === 100) {
              this.brewCoffeeStatus = BrewStatusEnum.NotBrewing;
              clearInterval(intervallID);
          }
      };
      intervallID = setInterval(intervallFunction.bind(this), timer);
  }

    onResize(event) {
      this.breakpoint =
          this.breakpoint = (event.target.innerWidth <= 720) ? 1 : (event.target.innerWidth <= 1460) ? 2 : 4;
    }
}
