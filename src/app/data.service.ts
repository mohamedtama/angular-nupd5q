import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class DataService {

  private _url = 'https://services-dev.logitud.fr/cannes/addresses/search';

  constructor(private _http: Http) { }

  loadAddressService(value): Observable<Response> {
    if (value && typeof value === 'string') {

      let params = new URLSearchParams();
      params.set('q', value);

      const httpOptions = {
        headers: new Headers({ 'Content-Type': 'application/json' }),
        params: params
      };
      
      return this._http
        .get(this._url, httpOptions).pipe(map(res => res.json())).pipe(map((res) => res.slice(0, 10)));
    }
  }

}