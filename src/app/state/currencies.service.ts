import { Injectable } from '@angular/core';
import { CurrenciesStore } from './currencies.store';
import { tap } from 'rxjs/operators';
import { CurrencyItem } from '../models';
import { ApiService } from '../API/api.service';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor(
    private currenciesStore: CurrenciesStore,
    private apiService: ApiService
  ) {}

  get() {
    return this.apiService.getCurrenciesInfo().pipe(
      tap((entities: any) => {
        this.currenciesStore.set(entities);
        //console.log(this.currenciesStore);                       //////////////////////////
      })
    );
  }

  update(id: string, currency: Partial<CurrencyItem>) {
    this.currenciesStore.update(id, currency);
  }

  remove(id: string) {
    this.currenciesStore.remove(id);
  }

  setSelected(id: string) {
    this.currenciesStore.setActive(id);
  }
}
