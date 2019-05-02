import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { HeaderComponent } from './header/header.component';
import { WeatherService } from './shared/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './shared/data.service';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'weather-details',
    component: WeatherDetailsComponent     
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeatherDetailsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WeatherService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
