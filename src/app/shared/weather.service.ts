import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {

  apiKey:string = '3d48b989d32674fb0b008bf34bc69510';
  url: string;
  constructor(private httpclient: HttpClient) {
    this.url = 'http://api.openweathermap.org/data/2.5/forecast?q=';
   }

   getWeatherDetails(cityName, countryCd){
    return this.httpclient.get(`${this.url}${cityName},${countryCd}&APPID=${this.apiKey}`);
   }
   
}
