import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {
  constructor(private http: Http) {
  }

  API_BASE_URL = environment['API_BASE_URL'];


  login(data) {
    return this.http.post(this.API_BASE_URL + '/login', data)
      .map(response => {
        return (response.json());
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any): Observable<any> {
    return Observable.throw("error");
  }
}
