import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonServiceInterface } from 'src/app/shared/interfaces/common-services.interface';
import {
  IClaimUnclaim,
  IClaimUnclaimModel,
  IClaimUnclaimResponse,
} from '../interfaces/IClaimUnclaim.interface';

@Injectable({
  providedIn: 'root',
})
export class ClaimUnclaimService implements CommonServiceInterface {
  apiURL = 'http://localhost:3000/claim-unclaim';
  http = inject(HttpClient);

  constructor() {}

  getAll(): Observable<IClaimUnclaimResponse[]> {
    console.log('getAll');
    return this.http.get<IClaimUnclaimResponse[]>(`${this.apiURL}`);
  }

  getOne(id: number): Observable<IClaimUnclaimResponse> {
    return this.http.get<IClaimUnclaimResponse>(`${this.apiURL}/${id}`);
  }

  create(client: Observable<IClaimUnclaim>) {
    return this.http.post<IClaimUnclaimResponse>(`${this.apiURL}`, client);
  }

  update(id: number, client: Partial<IClaimUnclaimModel>) {
    return this.http.put<void>(`${this.apiURL}/${id}`, client);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  mapData(data: IClaimUnclaimResponse) {
    return {
      _id: data.id,
      type: data.type,
      description: data.description,
    };
  }
}
