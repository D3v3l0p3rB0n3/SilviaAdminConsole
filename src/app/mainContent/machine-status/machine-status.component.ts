import {Component, OnDestroy, OnInit} from '@angular/core';
import {MachineStatusService} from '../../../services/machine-status.service';
import {Subscription} from 'rxjs';
import {MachineStatusModel} from '../../../services/models/machine-status.model';
import {BackendStatusEnum} from '../../../services/models/backend-status.enum';
import {BrewService} from '../../../services/brew.service';
import {BrewStatusEnum} from '../../../services/models/brew-status.enum';
import {SocketService} from '../../../services/socket.service';

@Component({
  selector: 'app-machine-status',
  templateUrl: './machine-status.component.html',
  styleUrls: ['./machine-status.component.scss']
})
export class MachineStatusComponent implements OnInit, OnDestroy {

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
              public socketService: SocketService) {}

  ngOnInit() {
      if (this.socketService.machineStatus) {
          this.machineStatusStatus = BackendStatusEnum.SUCCESS;
      } else {
          this.machineStatusStatus = BackendStatusEnum.LOADING;
      }
    this.brewCoffeeStatus = BrewStatusEnum.NotBrewing;
    this.breakpoint = (window.innerWidth <= 720) ? 1 : (window.innerWidth <= 1460) ? 2 : 4;
    this.socketService.connectionReady.subscribe(() => {
        if (this.socketService.machineStatus) {
            this.machineStatusStatus = BackendStatusEnum.SUCCESS;
        }
    });
    this.socketService.createSockJS();
  }

  ngOnDestroy(): void {
      if (this.machineStatusSubscription) {
          this.machineStatusSubscription.unsubscribe();
      }
      if (this.setMachineStatusSubscription) {
          this.setMachineStatusSubscription.unsubscribe();
      }
      if (this.startBrewingSubscription) {
          this.startBrewingSubscription.unsubscribe();
      }
  }

  switchMachineStatus(): void {
    this.setMachineStatusSubscription = this.machineStatusService.setMachineStatus().subscribe(() => {
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
