import { Injectable, OnInit } from '@angular/core'
import {BehaviorSubject, forkJoin, interval, Observable, switchMap} from 'rxjs'
import { Currency } from '../models/currency'
import { HttpClient } from '@angular/common/http'
import { ConverterPageComponent } from '../converter-page/converter-page.component'

// const baseUrl: string = 'https://api.apilayer.com/currency_data/live'
// ?apikey=9lywuXpexs982Lrx3Egj4NV8DyfA7MxT&from=USD&to=RUB&amount=1
const apikey: string = '6bGg5USITsGnKslkiZ1ztWF1NrDZoQOW'
@Injectable({ providedIn: 'root' })

export class ApiConnService{
  readonly firstCurrencies: string[] = ['USD', 'EUR', 'GBP']
  readonly secondCurrencies: string[] = ['CNY', 'JPY', 'TRY']
  baseConvertUrl: string = 'https://api.apilayer.com/currency_data/convert'
  results: BehaviorSubject<Currency[]> = new BehaviorSubject<Currency[]>([{ name: '', cost: 0 }])
  data$: Observable<Currency[]> = this.results.asObservable()

  constructor (private readonly http: HttpClient) {
  }

  initFetching (): void {
    interval(5000)
      .pipe(
        switchMap(() => this.fetchData(this.firstCurrencies))
      )
      .subscribe()
  }
  createQueries (currencies: string[]): string[] {
    const queries: string[] = []
    currencies.forEach(currency => {
      queries.push(this.baseConvertUrl + '?from=' + currency + '&to=RUB&amount=1&apikey=' + apikey)
    })
    return queries
  }

  fetchData (currencies: string[]): void {
    const req: Array<Observable<object>> = this.createQueries(currencies).map(url => this.http.get(url))
    forkJoin(req).subscribe({
      next: (results: any[]) => { this.results.next(results) },
      error: (error) => { console.log(error) }
    })
  }
}
