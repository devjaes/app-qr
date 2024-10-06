import {
  DomainData,
  AppData,
} from 'src/app/shared/interfaces/domain-data.interface';

export interface IClaimUnclaimModel {
  type: string;
  description: string;
}

export interface IClaimUnclaimResponse extends IClaimUnclaimModel, DomainData {}

export interface IClaimUnclaim extends AppData, IClaimUnclaimModel {}
