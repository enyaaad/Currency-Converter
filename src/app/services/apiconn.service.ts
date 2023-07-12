import { Injectable } from '@angular/core'
import {BehaviorSubject, catchError, forkJoin, interval, Observable, Subscription, switchMap, timer} from 'rxjs'
import { Currency } from '../models/currency'
import { HttpClient } from '@angular/common/http'

// const baseUrl: string = 'https://api.apilayer.com/currency_data/live'
// ?apikey=9lywuXpexs982Lrx3Egj4NV8DyfA7MxT&from=USD&to=RUB&amount=1

const apikey: string = 'cfiqdhr6sic34EicZtXSpL51MXYRJrCl'
@Injectable({ providedIn: 'root' })

export class ApiConnService {
  readonly firstCurrencies: string[] = ['USD', 'EUR', 'GBP']
  readonly secondCurrencies: string[] = ['CNY', 'JPY', 'TRY']
  readonly baseConvertUrl: string = 'https://api.apilayer.com/currency_data/convert'
  results: BehaviorSubject<Currency[]> = new BehaviorSubject<Currency[]>([])
  data$: Observable<Currency[]> = this.results.asObservable()

  constructor (private readonly http: HttpClient) {
  }

  initFetching (order: string[]): Subscription {
    return timer(0, 5000)
      .pipe(
        switchMap(() => this.fetchData(order))
      )
      .subscribe()
  }

  createQueries (currencies: string[]): string[] {
    const queries: string[] = []
    currencies.forEach(currency => {
      queries.push(this.baseConvertUrl + '?from=' + currency + '&to=RUB&amount=1')
    })
    return queries
  }

  fetchData (currencies: string[]): Observable<Currency[]> {
    const req: Array<Observable<object>> = this.createQueries(currencies).map(url => this.http.get(url, { headers: { apikey } }))

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
