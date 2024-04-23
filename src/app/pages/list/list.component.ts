import { HomeService } from './../home/home.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  latitude: any;
  longitude: any;
  date: any;
  climaDados: any;

  constructor(
    private homeService: HomeService
  ) { }

  submitForm() {
    if (this.latitude && this.longitude && this.date) {
      this.homeService.getClima(this.latitude, this.longitude, this.date, this.date)
        .subscribe(data => {
          this.climaDados = data;
        });
    }
  }
}
