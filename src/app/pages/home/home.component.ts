import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  climaDados: any;

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
      });
  }
}
