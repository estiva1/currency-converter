import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { combineLatest, merge, Subject } from 'rxjs';
import { ApiService } from '../API/api.service';
import { CurrencyItem } from '../models';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit, OnChanges, OnDestroy {
  @Input() currencies: string[] | undefined;
  @Input() rate: number | undefined;
  @Input() activeCurrency: string | undefined;
  @Output() currencyChanged = new EventEmitter<{ from: string; to: string }>();

  form!: FormGroup;

  destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fromAmount: 0,
      fromCurrency: null,
      toAmount: 0,
      toCurrency: null,
    });

    //console.log(this.apiService.getCurrenciesInfo());         /////////////////////////

    const controlValueChanges$ = (controlName: string) =>
      this.form.get(controlName)!.valueChanges.pipe(distinctUntilChanged());

    merge([
      controlValueChanges$('fromAmount'),
      controlValueChanges$('toAmount'),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => {
        this.form
          .get('fromAmount')
          ?.updateValueAndValidity({ emitEvent: false });
        this.form.get('toAmount')?.updateValueAndValidity({ emitEvent: false });
      });

    combineLatest([
      controlValueChanges$('fromCurrency'),
      controlValueChanges$('toCurrency'),
    ])
      .pipe(
        filter(([from, to]) => Boolean(from) && Boolean(to)),
        takeUntil(this.destroy$)
      )
      .subscribe(([from, to]) => this.currencyChanged.emit({ from, to }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes['activeCurrency'] &&
      changes['activeCurrency'].currentValue
    ) {
      this.form.get('fromCurrency')?.setValue(this.activeCurrency);
    }
  }
}
