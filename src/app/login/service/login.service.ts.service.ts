import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class LoginService {

  constructor(private _http: Http) { }

  private _fetchData(url: string): Observable<any> {
    return this._http.get(url)
      .map((res) => res.json());
  }

  private _postData(url: string, data: object): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url, JSON.stringify(data), options);
  }

  public doLogin(data: Object): Observable<any> {
    return this._postData('http://192.168.56.1:8080/user/api/v1/Login', data);
  }

}
