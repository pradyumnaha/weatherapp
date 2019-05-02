import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  enteredCityCntryCd;
  //responsedata = [];
  responsedata;
  list = [];
  errorhttp: boolean = false;
  subscription: Subscription;
  weatherLineChart:any = [];
  windBarChart: any = [];
  sunny: boolean = false;
  partialSunny: boolean = false;
  cloudy: boolean = false;
  rainy: boolean = false;
  tempSelected: boolean = true;
  degCelcius = '';
  constructor(private weatherService: WeatherService, private dataService: DataService) { }

  ngOnInit() {
    this.subscription = this.dataService.currentCitySubject.subscribe(city => this.enteredCityCntryCd = city);
    var cityArr = this.enteredCityCntryCd.split(',');
    this.weatherService.getWeatherDetails(cityArr[0], cityArr[1]).subscribe((response) => {
      //const data = response.json;
      //this.responsedata.push(response);
      //console.log(this.responsedata.length);
      //console.log(data);
      this.responsedata = response;
      this.list = this.responsedata.list;
      // let ctx = document.getElementById('mylineChart');
      // console.log(ctx);
      const kTemp = this.responsedata.list[0].main.temp;
      const kToCel = kTemp - 273;
      
      this.degCelcius = Math.round(kToCel * 100) / 100 + '\xB0C';
      document.getElementById("windBarChart").style.display = 'block';
      document.getElementById("weatherLineChart").style.display = 'none';
      document.getElementById("homeBtn").style.display = 'block';

      let tempMax = this.list.map(res => res.main.temp_max);
      let tempMin = this.list.map(res => res.main.temp_min);
      let allDates = this.list.map(res => res.dt);

      let weatherDates = [];
      for(let i=0; i<4; i++){        
        let date = new Date(allDates[i] *1000);
        weatherDates.push(date.toLocaleTimeString('en',{year:'numeric', month: 'short', day: 'numeric'}));
      }

      // allDates.forEach(element => {
      //   let date = new Date(element *1000);
      //   weatherDates.push(date.toLocaleTimeString('en',{year:'numeric', month: 'short', day: 'numeric'}));
      // });

      let couldyPercent = this.responsedata.list[0].clouds.all;
    

      if( couldyPercent <= 25 )
      {
         this.sunny = true;
      }
      else if(couldyPercent > 25 && couldyPercent <= 60){
        this.partialSunny = true;
      }
      else if(couldyPercent > 60 && couldyPercent <=85){
        this.cloudy = true;
      }
      else{
        this.rainy = true;
      }

      this.weatherLineChart = new Chart('weatherLineChart', {
        type: 'line',
        data: {
          labels: weatherDates, 
          datasets: [
            {
              label: "MAX Temp",
              data: tempMax, 
              borderColor: '#00AEFF',
              fill: false
            },
            {
              label: "MIN Temp",
              data: tempMin,
              borderColor: '#00008B',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true,
            position: "bottom",
          },
          title: {
            display: true,
            text: 'MIN/MAX Temperature'
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Date and Time'
              },
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Temperature in Kelvin'
              },
            }],
          }
        }
      });
      let windSpeed = this.list.map(res => res.wind.speed);
      this.windBarChart = new Chart('windBarChart', {
        type: 'bar',
        data: {
          labels: weatherDates,
          datasets: [
            {
              backgroundColor: "#3e95cd",
              data: windSpeed
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Wind speed'
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Date and Time'
              },
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Wind speed in meter/sec'
              },
            }],
          }
        }
    });

    },
    error => {
      this.errorhttp = true;
    });
  }
  onTempClick(){
    document.getElementById("weatherLineChart").style.display = 'block';
    document.getElementById("windBarChart").style.display = 'none';
  }

  onWindClick(){
    document.getElementById("windBarChart").style.display = 'block';
    document.getElementById("weatherLineChart").style.display = 'none';
  }

  onButtonGroupClick($event){
    let clickedElement = $event.target || $event.srcElement;

    if( clickedElement.nodeName === "BUTTON" ) {

      let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
      // if a Button already has Class: .active
      if( isCertainButtonAlreadyActive ) {
        isCertainButtonAlreadyActive.classList.remove("active");
      }

      clickedElement.className += " active";
    }

  }
}
