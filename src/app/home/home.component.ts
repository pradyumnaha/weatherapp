import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  weatherForm : FormGroup;
  enteredCityName: string = "";
  enteredCountryCode: string = "";
  validFail: boolean = false;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.weatherForm = new FormGroup({
      'CityName': new FormControl(null, [Validators.required]),
      'CountryCd': new FormControl(null, [Validators.required])
    });
  }

  onClickGetWeatherDetails(){
    if(!this.enteredCityName.length || !this.enteredCountryCode.length){
      this.validFail= true;
      return;
    }
        
    this.dataService.sendCityCntryCd(`${this.enteredCityName},${this.enteredCountryCode}`);
    this.router.navigate(['/weather-details']);
    
  }

}
