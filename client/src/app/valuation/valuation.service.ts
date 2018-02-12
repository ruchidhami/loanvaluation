import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';

@Injectable()
export class ValuationService {
  constructor(private http: Http) {
  }

  API_BASE_URL = 'https://loan-valuation-api.herokuapp.com/v1';

  createValaution(data) {
    return this.http.post(this.API_BASE_URL + '/valuation', data)
      .map(response => {
        const valuationObj = response.json();
        return valuationObj;
      })
      .catch(this.handleError);
  }


  listValuation(queryParams) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('limit', queryParams.limit);
    params.set('pageno', queryParams.pageno);
    if (queryParams.q) {
      params.set('q', queryParams.q);
    }

    const requestOptions = new RequestOptions();
    requestOptions.search = params;

    return this.http.get(this.API_BASE_URL + '/valuation', requestOptions)
      .map(response => {
        return (response.json());
      })
      .catch(this.handleError);
  }


  editValuation(valuationId, data) {
    return this.http.patch(this.API_BASE_URL + '/valuation/' + valuationId, data)
      .map(response => {
        const valuation = response.json();

        return valuation;
      })
      .catch(this.handleError);
  }

  fetchValuation(valuationId) {
    return this.http.get(this.API_BASE_URL + '/valuation/' + valuationId)
      .map(response => {
        return (response.json());
      })
      .catch(this.handleError);
  }

  deleteValaution(valuationId) {
    return this.http.delete(this.API_BASE_URL + '/valuation/' + valuationId)
      .map(response => {
        return (response.json());
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any): Observable<any> {
    return Observable.throw("error");
  }
}
