import {Component, OnDestroy, OnInit} from '@angular/core';
import {MachineStatusService} from '../../../services/machine-status.service';
import {Subscription} from 'rxjs';
import {MachineStatusModel} from '../../../services/models/machine-status.model';
import {BackendStatusEnum} from '../../../services/models/backend-status.enum';
import {MatSlideToggleChange} from '@angular/material';

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

  // ui
  _backendStatus: any = BackendStatusEnum;
  machineStatusStatus: BackendStatusEnum;
  brewCoffeeStatus: BackendStatusEnum;

  constructor(private machineStatusService: MachineStatusService) { }

  ngOnInit() {
    this.machineStatusSubscription = this.machineStatusService.getMachineStatus().subscribe((machineStatus: MachineStatusModel) => {
      if (machineStatus) {
          this._machineStatus = machineStatus;
          this.machineStatusStatus = BackendStatusEnum.SUCCESS;
      }
    });
    this.machineStatusStatus = BackendStatusEnum.LOADING;
    this.brewCoffeeStatus = BackendStatusEnum.SUCCESS;
  }

  ngOnDestroy(): void {
      this.machineStatusSubscription.unsubscribe();
  }

  switchMachineStatus(): void {
    this.setMachineStatusSubscription = this.machineStatusService.setMachineStatus().subscribe((machineStatus: MachineStatusModel) => {
        if (machineStatus) {
            this._machineStatus = machineStatus;
            this.machineStatusStatus = BackendStatusEnum.SUCCESS;
        }
    });
  }

}
