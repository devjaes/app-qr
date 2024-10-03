import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IAgency } from '../interfaces/IAgency';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  apiUrl = `${environment.API_URL}/agency`
  http = inject(HttpClient)

  constructor() { }

  getAgencies(): Observable<IAgency[]> {
    return this.http.get<IAgency[]>(`${this.apiUrl}`)
  }

  getAgencyById(id: number): Observable<IAgency> {
    return this.http.get<IAgency>(`${this.apiUrl}/${id}`)
  }

  createAgency(agency: Omit<IAgency, '_id'>): Observable<IAgency> {
    return this.http.post<IAgency>(`${this.apiUrl}`, agency)
  }

  updateAgency(id: number, agency: Partial<Omit<IAgency, '_id'>>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, agency)
  }

  deleteAgency(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
