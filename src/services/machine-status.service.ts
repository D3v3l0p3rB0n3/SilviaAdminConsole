import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MachineStatusModel} from './models/machine-status.model';
import {environment} from '../environments/environment';

@Injectable()
export class MachineStatusService {

    constructor(private http: HttpClient) {
    }

    /**
     * Service to get status if the machine in on or off
     * returns a timestamp when the machine was started
     */
    getMachineStatus(): Observable<MachineStatusModel> {
        return this.http.get<MachineStatusModel>(
            `${environment.apiBaseUrl}:${environment.apiPort}${environment.apiBaseRef}/machineStatus`
        );
    }

    /**
     * Service to switch the status of the machine
     * returns a timestamp when the machine was started
     */
    setMachineStatus(): Observable<MachineStatusModel> {
        return this.http.post<MachineStatusModel>(
            `${environment.apiBaseUrl}:${environment.apiPort}${environment.apiBaseRef}/machineStatus`,
            null
        );
    }
}
