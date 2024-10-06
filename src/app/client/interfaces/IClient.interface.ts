import {
  DomainData,
  AppData,
} from 'src/app/shared/interfaces/domain-data.interface';

export interface IClientModel {
  name: string;
  lastName: string;
  address: string;
}

export interface IClientResponse
  extends Omit<IClientModel, 'lastName'>,
    DomainData {
  last_name: string;
}

export interface IClient extends AppData, IClientModel {}
