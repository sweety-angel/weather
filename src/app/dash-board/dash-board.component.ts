import { HttpClient } from '@angular/common/http';
import { WeatherService } from './../weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  currentWeatherData = new Array();
  zipCode: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    const data = JSON.parse(localStorage.getItem('currentWeatherReport')!);
    if (data) 
    this.currentWeatherData = data;
  }

  getCurrentWeatherByZipCode(zipCode: string) {
    if (zipCode && zipCode !== '') {
      let ifExists = false;
      this.currentWeatherData.forEach((resp: any) => {
        if (resp.zipcode === zipCode) ifExists = true;
        else ifExists = false;
      });
      if (!ifExists) {
        this.weatherService.getCurrentWeatherByZipCode(zipCode).subscribe(
          (data: any) => {
            if (data) {
              data = { ...data };
              this.currentWeatherData.push(data);
              localStorage.setItem(
                'currentWeatherReport',
                JSON.stringify(this.currentWeatherData)
              );
            }
            this.zipCode = '';
          },
          () => {
            alert(
              'invalid zipcode: ' +
                zipCode +
                ', or data not availble for this zipcode.'
            );
            this.zipCode = '';
          }
        );
      } else {
        this.zipCode = '';
        alert('zipcode already exists.');
      }
    }
  }
  remove(zipcode: string) {
    if (this.currentWeatherData && this.currentWeatherData.length > 0) {
      this.currentWeatherData = this.currentWeatherData.filter(
        (data: any) => data.zipcode !== zipcode
      );
      localStorage.setItem(
        'currentWeatherReport',
        JSON.stringify(this.currentWeatherData)
      );
    }
  }
}
