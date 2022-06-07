import { Injectable } from '@angular/core';
import {
  ActiveState,
  EntityState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import { CurrencyItem } from '../models';

export interface CurrencyState
  extends EntityState<CurrencyItem, string>,
    ActiveState {
  currentRate: number;
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'currencies', idKey: 'name' })
export class CurrenciesStore extends EntityStore<CurrencyState> {
  constructor() {
    super({currentRate: 1})
  }
}
