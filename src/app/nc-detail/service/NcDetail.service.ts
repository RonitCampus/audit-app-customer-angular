import { observable } from 'rxjs/symbol/observable';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class NcDetailService {

  constructor(private _http: Http) {
  }

  private _fetchData(url: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authToken', sessionStorage.getItem('authToken'));
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url, options)
      .map(res => res.json());
  }

  private _postData(url: string, data: object): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authToken', sessionStorage.getItem('authToken'));
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url, JSON.stringify(data), options);
  }

  public getNcDetailInfo(ncId: number): Observable<any> {
    return this._fetchData( 'http://192.168.1.245:8080/auth/user/api/v1/viewAll/NcDetail/' + ncId);
  }

  public updateNcRegister(data: Object): Observable<boolean> {
    return this._postData( 'http://192.168.1.245:8080/auth/user/api/v1/viewAll/update', data);
  }

}
