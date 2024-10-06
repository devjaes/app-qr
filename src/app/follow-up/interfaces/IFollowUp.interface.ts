import {
  DomainData,
  AppData,
} from 'src/app/shared/interfaces/domain-data.interface';

export interface IFollowUpModel {
  _id: number;
  reason: string;
  status: string;
}

export interface IFollowUpResponse extends IFollowUpModel, DomainData {}

export interface IFollowUp extends AppData, IFollowUpModel {}
