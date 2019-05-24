import { TestBed, async } from '@angular/core/testing';
import { HomeComponent } from '../home/home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

const citySubject = new BehaviorSubject<string>("London,uk");
const dataService = {      
    currentCitySubject: citySubject.asObservable()
};

describe('Component: Home', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
        imports:[ RouterTestingModule, ReactiveFormsModule ],
        declarations: [ HomeComponent ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [DataService]
        }).compileComponents();
    });

    it('should call subject.next', () => {
        const value = 'London,uk';
        citySubject.subscribe(res => expect(res).toEqual(value));
        citySubject.next(value);
      });

    
});