import { Injectable } from '@angular/core'
import { Axios } from 'axios-observable'
import { BehaviorSubject, Observable } from 'rxjs'
import { Currency } from '../models/currency'

// const baseUrl: string = 'https://api.apilayer.com/currency_data/live'
const baseConvertUrl: string = 'https://api.apilayer.com/currency_data/convert'
// ?apikey=9lywuXpexs982Lrx3Egj4NV8DyfA7MxT&from=USD&to=RUB&amount=1
const apikey: string = '9lywuXpexs982Lrx3Egj4NV8DyfA7MxT'
@Injectable({ providedIn: 'root' })

export class ApiConnService {
  private readonly dataSource: BehaviorSubject<Currency> = new BehaviorSubject<Currency>({ name: '', cost: 0 })
  data: Observable<Currency> = this.dataSource.asObservable()

  httpsOptions = { 'Content-type': 'aplication/json' }

  convertCurrency (from: string, to: string, amount: number): void {
    Axios.get(baseConvertUrl, { params: { apikey, from, to, amount } }).subscribe(
      response => {
        console.log(this.data)
        this.data = response.data
      },
      error => {
        console.log(error)
      }
    )
  }

  sendCurrency (data: Currency): void {
    this.dataSource.next(data)
  }
}
