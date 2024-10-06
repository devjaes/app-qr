import {
  AppData,
  BaseData,
  DomainData,
} from 'src/app/shared/interfaces/domain-data.interface';

export interface IAgencyModel extends BaseData {
  name: string;
  address: string;
}

export interface IAgencyResponse extends IAgencyModel, DomainData {}

export interface IAgency extends AppData, IAgencyModel {}
