import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserNcService {
  constructor(private _http: Http) { }

  private _fetchData(url: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authToken', sessionStorage.getItem('authToken'));
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url, options)
      .map(res => res.json());
  }

  public fetchNcsAgaintsUser(): Observable<any> {
    return this._fetchData('http://192.168.56.1:8080/auth/user/api/v1/viewAll/Ncs');
  }
}
