import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit {
  currentCurrency: any = [];

  constructor(public httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .subscribe((data) => {
        this.currentCurrency = data;
      });
  }
}
