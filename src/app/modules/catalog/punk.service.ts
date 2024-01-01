import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beer } from '../../core/types';
import { environment } from '../../../environments/environment';

interface GetPaginatedParams {
  // Pagination
  page?: number;
  per_page?: number;

  // Other
  abv_gt?: number;
  abv_lt?: number;
  ibu_gt?: number;
  ibu_lt?: number;
  ebc_gt?: number;
  ebc_lt?: number;
  beer_name?: string;
  yeast?: string;
  brewed_before?: string; // mm-yyyy
  brewed_after?: string; // mm-yyyy
  hops?: string;
  malt?: string;
  food?: string;
  ids?: string;
}

@Injectable({ providedIn: 'root' })
export class PunkService {
  private readonly baseURL = environment.punkAPIBase;

  constructor(private readonly http: HttpClient) {
  }

  getPaginated(params: GetPaginatedParams): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.baseURL + '/beers' + this.serializeQueryParams(params));
  }

  private serializeQueryParams<T extends Record<string, any>>(params: T | undefined): string {
    if (!params) {
      return '';
    }

    const keys = Object.keys(params);

    if (keys.length === 0) {
      return '';
    }

    return '?' + Object.keys(params).map((key) => key + '=' + params[key]).join('&');
  }
}
