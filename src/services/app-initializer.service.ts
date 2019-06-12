import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppInitializerService {
    constructor(private http: HttpClient,
                private injector: Injector) {
    }

    public get router(): Router {
        return this.injector.get(Router);
    }

    loginOnAppInit(): () => Promise<any> {
        return (): Promise<any> => {
            return new Promise((resolve: Function, reject: Function) => {
                this.http.get(
                    `${environment.apiBaseUrl}:${environment.apiPort}${environment.apiBaseRef}/authenticate`,
                    {
                        observe: 'response'
                    }
                ).pipe(
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(errorResponse);
                    })
                ).subscribe((response: any) => {
                    if (response.status === 200) {
                        resolve();
                    } else {
                        /*console.log(response);
                        console.log('401');
                        this.router.navigate(['/401']);
                        resolve(); // resolve anyway to see 401 page*/
                        reject();
                    }
                });
            });
        };
    }
}
