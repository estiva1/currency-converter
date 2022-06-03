import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentCurrency: any;
  usd: any;
  eur: any;
  constructor(public httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .subscribe((data) => {
        this.currentCurrency = data;
        this.currentCurrency.find((obj: any) => {
          if (obj["cc"] === 'USD') {
            this.usd = obj.rate.toFixed(2);
          } else if (obj["cc"] === 'EUR') {
            this.eur = obj["rate"].toFixed(2);
          }
        });
      });
  }
}
