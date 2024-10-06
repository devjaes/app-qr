import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonServiceInterface } from 'src/app/shared/interfaces/common-services.interface';
import {
  IClient,
  IClientModel,
  IClientResponse,
} from '../interfaces/IClient.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService implements CommonServiceInterface {
  apiURL = 'http://localhost:3000/client';
  http = inject(HttpClient);

  constructor() {}

  getAll(): Observable<IClientResponse[]> {
    console.log('getAll');
    return this.http.get<IClientResponse[]>(`${this.apiURL}`);
  }

  getOne(id: number): Observable<IClientResponse> {
    return this.http.get<IClientResponse>(`${this.apiURL}/${id}`);
  }

  create(client: Observable<IClient>) {
    return this.http.post<IClientResponse>(`${this.apiURL}`, client);
  }

  update(id: number, client: Partial<IClientModel>) {
    return this.http.put<void>(`${this.apiURL}/${id}`, client);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  mapData(data: IClientResponse) {
    return {
      _id: data.id,
      name: data.name,
      lastName: data.last_name,
      address: data.address,
    };
  }
}
