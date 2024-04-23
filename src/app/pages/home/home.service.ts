import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(
    private http: HttpClient
  ) { }

  getClima(latitude: number, longitude: number, dataInicio: string, dataFim: string): Observable<any> {
    const url = `${this.apiUrl}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&start_date=${dataInicio}&end_date=${dataFim}&timezone=GMT-03`;
    return this.http.get<any>(url)
  }
}
