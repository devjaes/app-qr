import { Observable } from "rxjs";
import { AppData, BaseData, DomainData } from "./domain-data.interface";

export interface CommonServiceInterface {
  getAll(): Observable<DomainData[]>,
  getOne(id: number): Observable<DomainData>,
  create(data: BaseData): Observable<DomainData>,
  update(id: number, data: Partial<BaseData>): Observable<void>,
  delete(id: number): Observable<void>,
  mapData(data: DomainData): AppData
}
