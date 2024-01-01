import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ABV, EBC, IBU } from '../../../../core/types';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ResourceService {
  private readonly baseURL = environment.resourceBase;

  constructor(private readonly http: HttpClient) {
  }

  getABV(): Observable<ABV[]> {
    return this.http.get<ABV[]>(this.baseURL + '/abv.json');
  }

  getEBC(): Observable<EBC[]> {
    return this.http.get<EBC[]>(this.baseURL + '/ebc.json');
  }

  getIBU(): Observable<IBU[]> {
    return this.http.get<IBU[]>(this.baseURL + '/ibu.json');
  }

  getFood(): Observable<string[]> {
    return this.http.get<string[]>(this.baseURL + '/food.json');
  }

  getHops(): Observable<string[]> {
    return this.http.get<string[]>(this.baseURL + '/hops.json');
  }

  getMalt(): Observable<string[]> {
    return this.http.get<string[]>(this.baseURL + '/malt.json');
  }

  getYeast(): Observable<string[]> {
    return this.http.get<string[]>(this.baseURL + '/yeast.json');
  }
}
