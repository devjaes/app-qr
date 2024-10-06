import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonServiceInterface } from 'src/app/shared/interfaces/common-services.interface';
import {
  AppData,
  DomainData,
} from 'src/app/shared/interfaces/domain-data.interface';
import { environment } from 'src/environments/environment.development';
import type {
  IAgency,
  IAgencyModel,
  IAgencyResponse,
} from '../interfaces/IAgency.interface';

@Injectable({
  providedIn: 'root',
})
export class AgencyService implements CommonServiceInterface {
  apiUrl = `${environment.API_URL}/agency`;
  http = inject(HttpClient);

  constructor() {}

  getAll(): Observable<IAgencyResponse[]> {
    return this.http.get<IAgencyResponse[]>(`${this.apiUrl}`);
  }

  getOne(id: number): Observable<IAgencyResponse> {
    return this.http.get<IAgencyResponse>(`${this.apiUrl}/${id}`);
  }

  create(agency: Omit<IAgency, '_id'>): Observable<IAgencyResponse> {
    return this.http.post<IAgencyResponse>(`${this.apiUrl}`, agency);
  }

  update(id: number, agency: Partial<Omit<IAgency, '_id'>>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, agency);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  mapData(data: IAgencyResponse) {
    return { _id: data.id, name: data.name, address: data.address };
  }
}
