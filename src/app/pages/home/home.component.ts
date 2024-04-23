import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import * as dayjs from 'dayjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  climaDados: any;
  temperaturaMaxima: any;
  temperaturaMinima: any;
  datatemperaturaMaxima: any;
  datatemperaturaMinima: any;


  constructor(
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.getClima();
  }

  getClima() {
    const latitude = -22.0;
    const longitude = -50.25;
    const dataInicio = '2024-04-15';
    const dataFim = '2024-04-15';

    this.homeService.getClima(latitude, longitude, dataInicio, dataFim)
      .subscribe(data => {
        this.climaDados = data;
        this.calcularMinMaxTemperatura();
      });
  }

  calcularMinMaxTemperatura(): void {
    const minIndex = this.climaDados.hourly.temperature_2m.indexOf(this.temperaturaMinima);
    const maxIndex = this.climaDados.hourly.temperature_2m.indexOf(this.temperaturaMaxima);

    const minDate = this.climaDados.hourly.time[minIndex];
    const maxDate = this.climaDados.hourly.time[maxIndex];
    this.datatemperaturaMinima = dayjs(minDate).format('DD/MM/YYYY HH:mm');
    this.datatemperaturaMaxima = dayjs(maxDate).format('DD/MM/YYYY HH:mm');
    this.calcularMinMaxDataTemperatura();
  }

  calcularMinMaxDataTemperatura() {
    const minIndex = this.climaDados.hourly.temperature_2m.indexOf(this.temperaturaMinima);
    const maxIndex = this.climaDados.hourly.temperature_2m.indexOf(this.temperaturaMaxima);
    this.datatemperaturaMinima = dayjs(this.climaDados.hourly.time[minIndex]).format('DD/MM/YYYY HH:mm');
    this.datatemperaturaMaxima = dayjs(this.climaDados.hourly.time[maxIndex]).format('DD/MM/YYYY HH:mm');
  }

}
