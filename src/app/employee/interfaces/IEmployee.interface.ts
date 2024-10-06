import {
  DomainData,
  AppData,
} from 'src/app/shared/interfaces/domain-data.interface';

export interface IEmployeeModel {
  name: string;
  lastName: string;
  position: string;
}

export interface IEmployeeResponse
  extends Omit<IEmployeeModel, 'lastName'>,
    DomainData {
  last_name: string;
}

export interface IEmployee extends AppData, IEmployeeModel {}
