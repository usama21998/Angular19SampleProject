import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})
export class RestService {


    private baseUrlApi = "https://67af26cd9e85da2f020fb2d4.mockapi.io/mockapi/";
    constructor(private http: HttpClient) {
    }

    public get = (url: String) => {
        console.log(this.baseUrlApi + url);
        return this.http.get(this.baseUrlApi + url).pipe(retry(0), catchError(e => this.authErrorCatch(e)));
    }

    public post = (url: String, obj: any) => {
        console.log(this.baseUrlApi + url);
        return this.http.post(this.baseUrlApi + url, obj).pipe(retry(0), catchError(e => this.authErrorCatch(e)));
    }

    public put = (url: String, obj: any) => {
        console.log(this.baseUrlApi + url);
        return this.http.put(this.baseUrlApi + url, obj).pipe(retry(0), catchError(e => this.authErrorCatch(e)));
    }

    public delete = (url: String) => {
        console.log(this.baseUrlApi + url);
        return this.http.delete(this.baseUrlApi + url).pipe(retry(0), catchError(e => this.authErrorCatch(e)));
    }


    public authErrorCatch(e: any): Observable<never> {
        debugger
        return throwError(e.error.message?e.error.message:e.error);
    }



}