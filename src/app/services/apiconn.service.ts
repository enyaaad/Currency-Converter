import { Injectable } from '@angular/core'
import {
  BehaviorSubject,
  catchError,
  forkJoin,
  map,
  Observable,
  pairwise,
  Subscription,
  switchMap,
  timer
} from 'rxjs'
import { Currency } from '../models/currency'
import { HttpClient } from '@angular/common/http'

// const baseUrl: string = 'https://api.apilayer.com/currency_data/live'
// ?apikey=9lywuXpexs982Lrx3Egj4NV8DyfA7MxT&from=USD&to=RUB&amount=1

const apikey: string = 'O0U02pIZVjdqoocrYCmzc8OHm8mlKZz3'
@Injectable({ providedIn: 'root' })

export class ApiConnService {
  readonly firstCurrencies: string[] = ['USD', 'EUR', 'GBP']
  readonly secondCurrencies: string[] = ['CNY', 'JPY', 'TRY']
  readonly baseConvertUrl: string = 'https://api.apilayer.com/currency_data/convert'
  paramsSubj: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.firstCurrencies)
  params$: Observable<string[]> = this.paramsSubj.asObservable()
  results: BehaviorSubject<Currency[]> = new BehaviorSubject<Currency[]>([])
  data$: Observable<Currency[]> = this.results.asObservable()

  constructor (private readonly http: HttpClient) {
  }

  toggleParams (): void {
    const currentParams = this.paramsSubj.getValue()
    const newParams = currentParams === this.firstCurrencies ? this.firstCurrencies.concat(this.secondCurrencies) : this.firstCurrencies
    this.paramsSubj.next(newParams)
  }

  initFetching (): Subscription {
    this.fetchData()
    return timer(0, 10000)
      .pipe(
        switchMap(() => this.fetchData())
      )
      .subscribe(el => {
        console.log(el)
      })
  }

  createQueries (currencies: Observable<string[]>): string[] {
    const queries: string[] = []
    currencies.pipe(
      map(elem => {
        elem.forEach(currency => {
          queries.push(this.baseConvertUrl + '?from=' + currency + '&to=RUB&amount=1')
        })
      })
    ).subscribe()
    return queries
  }

  fetchData (): Observable<Currency[]> {
    const req: Array<Observable<object>> = this.createQueries(this.params$).map(url => this.http.get(url, { headers: { apikey } }))

    return forkJoin(req).pipe(
      switchMap((results: any[]) => {
        this.results.next(results)
        return this.data$
      }),
      catchError((err: any) => {
        console.log(err)
        return new Observable<[]>()
      })
    )
  }
}
