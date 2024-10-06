import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonServiceInterface } from 'src/app/shared/interfaces/common-services.interface';
import {
  IFollowUp,
  IFollowUpModel,
  IFollowUpResponse,
} from '../interfaces/IFollowUp.interface';

@Injectable({
  providedIn: 'root',
})
export class FollowUpService implements CommonServiceInterface {
  apiURL = 'http://localhost:3000/follow-up';
  http = inject(HttpClient);

  constructor() {}

  getAll(): Observable<IFollowUpResponse[]> {
    console.log('getAll');
    return this.http.get<IFollowUpResponse[]>(`${this.apiURL}`);
  }

  getOne(id: number): Observable<IFollowUpResponse> {
    return this.http.get<IFollowUpResponse>(`${this.apiURL}/${id}`);
  }

  create(client: Observable<IFollowUp>) {
    return this.http.post<IFollowUpResponse>(`${this.apiURL}`, client);
  }

  update(id: number, client: Partial<IFollowUpModel>) {
    return this.http.put<void>(`${this.apiURL}/${id}`, client);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  mapData(data: IFollowUpResponse) {
    return {
      _id: data.id,
      reason: data.reason,
      status: data.status,
    };
  }
}
