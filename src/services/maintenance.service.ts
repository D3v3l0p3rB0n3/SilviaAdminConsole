import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable()
export class MaintenanceService {

    constructor(private http: HttpClient) {
    }

    /**
     * Service to get status if the machine in on or off
     * returns a timestamp when the machine was started
     */
    startBackflashing(): Observable<any> {
        return this.http.post(
            `${environment.apiBaseUrl}:${environment.apiPort}${environment.apiBaseRef}/backFlush`, null
        );
    }

}