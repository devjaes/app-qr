import { AppData, DomainData } from "src/app/shared/interfaces/domain-data.interface";

export interface IChannelModel {
  name: string;
}

export interface IChannelResponse extends IChannelModel, DomainData { }

export interface IChannel extends AppData, IChannelModel { }
