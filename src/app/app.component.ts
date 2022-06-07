import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMapTo } from 'rxjs/operators';
import { CurrencyItem } from './models';
import { ID } from '@datorama/akita';
import { CurrenciesService } from './state/currencies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Сurrency Сonverter';

  items$: Observable<CurrencyItem[]> | undefined;

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit() {
    this.currenciesService.get();
  }

  onRowSelect(currencyName: string) {
    this.currenciesService.setSelected(currencyName);
  }
}
