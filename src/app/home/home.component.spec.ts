import { TestBed, async } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

// const citySubject = new BehaviorSubject<string>("London,uk");
// const dataService = {      
//     currentCitySubject: citySubject.asObservable()
// };

describe('Component: Home:', () => {
    let router: Router, component, fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
        imports:[ RouterTestingModule.withRoutes([]), ReactiveFormsModule ],
        declarations: [ HomeComponent ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [DataService]
        }).compileComponents();

        router = TestBed.get(Router);
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the HomeComponent', () => {
        expect(component).toBeTruthy();
    });

    it('weatherForm is defined after OnInit call', () => {
        component.ngOnInit();     
        expect(component.weatherForm).toBeDefined();
    });

    it('validation fails when city and country code is not entered by the user on GetWeatherDetails button click ', () => {
        component.enteredCityName = "";
        component.enteredCountryCode = "";
        component.onClickGetWeatherDetails();
        fixture.detectChanges();
        expect(component.validFail).toBeTruthy();
    });

    it('validation fails when city or country code is not entered by the user on GetWeatherDetails button click ', () => {
        component.enteredCityName = "hassan"; 
        component.enteredCountryCode = "";
        component.onClickGetWeatherDetails();
        fixture.detectChanges();
        expect(component.validFail).toBeTruthy();
    });

    it('validation fails when city or country code is not entered by the user on GetWeatherDetails button click ', () => {
        component.enteredCityName = ""; 
        component.enteredCountryCode = "in";
        component.onClickGetWeatherDetails();
        fixture.detectChanges();
        expect(component.validFail).toBeTruthy();
    });

    it('validation succeeds when city and country code is entered by the user on GetWeatherDetails button click ', () => { 
        component.enteredCityName = "hassan";
        component.enteredCountryCode = "in";
        component.onClickGetWeatherDetails();
        fixture.detectChanges();
        expect(component.validFail).not.toBeTruthy();
    });

    it('should navigate to weather-details', () => {
        let navigateSpy = spyOn(router, 'navigate');
        component.enteredCityName = "hassan";
        component.enteredCountryCode = "in";
        component.onClickGetWeatherDetails();
        expect(navigateSpy).toHaveBeenCalledWith(['/weather-details']);
    });

    it('should not navigate to weather-details', () => { 
        let navigateSpy = spyOn(router, 'navigate');
        component.enteredCityName = "";
        component.enteredCountryCode = "in";
        component.onClickGetWeatherDetails();
        expect(navigateSpy).not.toHaveBeenCalledWith(['/weather-details']);
    });

    it('Checking if the city details are sent to data service', () => {
        const dataService = fixture.debugElement.injector.get(DataService);
        spyOn(dataService, 'sendCityCntryCd').and.callThrough();
        component.enteredCityName = 'hassan';
        component.enteredCountryCode = 'in';
        component.onClickGetWeatherDetails();
        expect(dataService.sendCityCntryCd).toHaveBeenCalled();
    });
    
});