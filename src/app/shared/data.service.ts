import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private citySubject = new BehaviorSubject<string>("London,uk");
  currentCitySubject = this.citySubject.asObservable();
  constructor(){}

 sendCityCntryCd(cityCntryCd:string) {
   this.citySubject.next(cityCntryCd);
 }

}
