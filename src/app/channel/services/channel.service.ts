import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonServiceInterface } from 'src/app/shared/interfaces/common-services.interface';
import { IChannel, IChannelModel, IChannelResponse } from '../interfaces/IChannel.interface';

@Injectable({
  providedIn: 'root'
})
export class ChannelService implements CommonServiceInterface {
  apiURL = 'http://localhost:3000/channel'
  http = inject(HttpClient)

  constructor() { }

  getAll(): Observable<IChannelResponse[]> {
    console.log('getAll')
    return this.http.get<IChannelResponse[]>(`${this.apiURL}`)
  }

  getOne(id: number): Observable<IChannelResponse> {
    return this.http.get<IChannelResponse>(`${this.apiURL}/${id}`)
  }

  create(channet: Observable<IChannel>) {
    return this.http.post<IChannelResponse>(`${this.apiURL}`, channet)
  }

  update(id: number, channel: Partial<IChannelModel>) {
    return this.http.put<void>(`${this.apiURL}/${id}`, channel)
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiURL}/${id}`)
  }

  mapData(data: IChannelResponse) {
    return { _id: data.id, name: data.name }
  }
}
