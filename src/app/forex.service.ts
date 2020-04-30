import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { retry, retryWhen, catchError, map, delay, take, concatMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

  constructor(private http: HttpClient) {
  }

  /**
   * Gets all the valid pairs.
   */
  getPairs() {
    return this.http.get(this.CORS_PROXY + 'https://www.freeforexapi.com/api/live').pipe(
      retryWhen(errors => errors.pipe(delay(1000), take(3),
        tap(errorStatus => {
          throw errorStatus;
        }))
      ), map(res => {
        return res
      }), catchError(() =>
        of('error')
      ))
  }

  /**
   * Gets the exchange rate based of pairs.
   * @param val pair
   */
  getPairsValues(val: String) {
    // return this.http.get('https://www.freeforexapi.com/api/live?pairs=' + val).pipe(
    // return this.http.get(this.CORS_PROXY + 'https://www.freeforexapi.com/api/live?pairs=' + val).pipe(
    return this.http.get(this.CORS_PROXY + 'https://www.freeforexapi.com/api/live?pairs=' + val).pipe(
      // retryWhen(errors => errors.pipe(delay(1000), take(3),
      retry(3)
      , map(res => {
        return res
      }), catchError(() =>
        of('error')
      ))
    // return this.http.get(this.CORS_PROXY + 'https://www.freeforexapi.com/api/live?pairs=' + val).pipe(retry(3), catchError(() => {
    //   return 'ERROR'
    // }))
  }

}
