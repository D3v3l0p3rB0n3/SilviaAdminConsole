import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable()
export class MaintenanceService {

    constructor(private http: HttpClient) {
    }

    startBackflashing(): Observable<any> {
        return this.http.put(
            `${environment.apiBaseUrl}:${environment.apiPort}${environment.apiBaseRef}/backFlush`, null
        );
    }

    cancelBackflashing(): Observable<any> {
        return this.http.put(
            `${environment.apiBaseUrl}:${environment.apiPort}${environment.apiBaseRef}/cancelBackFlush`, null
        );
    }

}
