import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonServiceInterface } from 'src/app/shared/interfaces/common-services.interface';
import {
  IEmployee,
  IEmployeeModel,
  IEmployeeResponse,
} from '../interfaces/IEmployee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements CommonServiceInterface {
  apiURL = 'http://localhost:3000/employee';
  http = inject(HttpClient);

  constructor() {}

  getAll(): Observable<IEmployeeResponse[]> {
    console.log('getAll');
    return this.http.get<IEmployeeResponse[]>(`${this.apiURL}`);
  }

  getOne(id: number): Observable<IEmployeeResponse> {
    return this.http.get<IEmployeeResponse>(`${this.apiURL}/${id}`);
  }

  create(client: Observable<IEmployee>) {
    return this.http.post<IEmployeeResponse>(`${this.apiURL}`, client);
  }

  update(id: number, client: Partial<IEmployeeModel>) {
    return this.http.put<void>(`${this.apiURL}/${id}`, client);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  mapData(data: IEmployeeResponse) {
    return {
      _id: data.id,
      name: data.name,
      lastName: data.last_name,
      position: data.position,
    };
  }
}
