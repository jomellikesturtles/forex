import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForexService {

  CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

  constructor(private http: HttpClient) {
  }

  getPairs() {
    return this.http.get(this.CORS_PROXY + 'https://www.freeforexapi.com/api/live')
  }

  getPairsValues(val: String) {
    return this.http.get(this.CORS_PROXY + 'https://www.freeforexapi.com/api/live?pairs=' + val)
  }

  getThem() {
    this.http.get('https://api.themoviedb.org/3/movie/550?api_key=a636ce7bd0c125045f4170644b4d3d25').subscribe(e => {
      console.log(e)
    })
    this.http.get('https://cors-anywhere.herokuapp.com/https://www.freeforexapi.com/api/live?pairs=EURUSD').subscribe((e: any) => {
      console.log(e)
    })
  }
}
