import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable()
export class BrewService {

    constructor(private http: HttpClient) {
    }

    startBrewing(brewTime: number): Observable<any> {
        return this.http.put(
            `${environment.apiBaseUrl}:${environment.apiPort}${environment.apiBaseRef}/startBrewing`,
            {
                brewTime: brewTime
            }
        );
    }

    cancelBrewing(): Observable<any> {
        return this.http.put(
            `${environment.apiBaseUrl}:${environment.apiPort}${environment.apiBaseRef}/cancelBrewing`,
            null
        );
    }
}
