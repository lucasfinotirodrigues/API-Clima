import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

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
    this.temperaturaMinima = Math.min(...this.climaDados.hourly.temperature_2m);
    this.temperaturaMaxima = Math.max(...this.climaDados.hourly.temperature_2m);
    this.calculateMinMaxTemperatureTime();
  }

  calculateMinMaxTemperatureTime() {
    const minIndex = this.climaDados.hourly.temperature_2m.indexOf(this.temperaturaMinima);
    const maxIndex = this.climaDados.hourly.temperature_2m.indexOf(this.temperaturaMaxima);
    this.datatemperaturaMinima = this.climaDados.hourly.time[minIndex];
    this.datatemperaturaMaxima = this.climaDados.hourly.time[maxIndex];
  }
}
