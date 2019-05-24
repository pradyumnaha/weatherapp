import { TestBed, async } from '@angular/core/testing';
import { WeatherDetailsComponent } from './weather-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';
import { WeatherService } from '../shared/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('Component: Weather-details:', () => {
    let router: Router, component, fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
        imports:[ RouterTestingModule.withRoutes([]), ReactiveFormsModule, HttpClientModule],
        declarations: [ WeatherDetailsComponent ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [DataService, WeatherService]
        }).compileComponents();

        router = TestBed.get(Router);
        fixture = TestBed.createComponent(WeatherDetailsComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('should create the WeatherDetailsComponent', () => {
        expect(component).toBeTruthy();
    });

    it('onTempClick should change the graph', () => {
        component.onTempClick();
        expect(component.hideTempChart).toBeFalsy();
        expect(component.hideWindChart).toBeTruthy();
    });

    it('onWindClick should change the graph', () => {
        component.onWindClick();
        expect(component.hideTempChart).toBeTruthy();
        expect(component.hideWindChart).toBeFalsy();
    });

    it('onButtonGroupClick chnage the mouse event', () => {
        const event = {
                srcElement: {
                    nodeName: 'BUTTON',
                    parentElement: {
                        classList: ["btn", "btn-secondary", "btn-sm", "btnTemp"],
                        className: 'active'
                    }
                },
                target: {
                    nodeName: 'BUTTON',
                    parentElement: {
                        querySelector: (cssSelector) => {return false;},
                        classList: ["btn", "btn-secondary", "btn-sm", "btnTemp"],
                        className: 'active'
                    }
                }
        };
        component.onButtonGroupClick(event);
        expect(event.srcElement.parentElement.className).toEqual("active");
    });
});