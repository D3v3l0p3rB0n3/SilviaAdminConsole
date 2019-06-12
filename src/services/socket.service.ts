import {EventEmitter, Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import * as SockJS from 'sockjs-client';
import {MachineStatusModel} from './models/machine-status.model';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    public machineStatus: MachineStatusModel;
    public connectionReady: EventEmitter<any> = new EventEmitter();
    sockJS;

    public createSockJS(): void {
        if (!this.sockJS) {
            this.sockJS = new SockJS(`${environment.apiBaseUrl}:${environment.apiPort}${environment.sockJSBaseRef}`);
            const onMessageFunction: Function = function(e) {
                this.machineStatus = JSON.parse(e.data);
                this.connectionReady.emit();
            };
            this.sockJS.onmessage = onMessageFunction.bind(this);
        }
    }
}
