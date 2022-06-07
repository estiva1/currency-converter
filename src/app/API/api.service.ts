import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CurrencyItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  currentCurrency: any = []

  getCurrenciesInfo() {

    this.httpClient.get(`${environment.apiUrl}`).subscribe((data) => {
      this.currentCurrency.push(data);
      console.log(this.currentCurrency);
    })
      
      // currentCurrency = data;
      // console.log(currentCurrency);              /////////////////////////////////

    //return currentCurrency;
  }
}
