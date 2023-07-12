import { Component, OnInit } from '@angular/core'
import { ApiConnService } from '../services/apiconn.service'
import {map, Observable, pairwise} from 'rxjs'
import { Currency } from '../models/currency'

@Component({
  selector: 'app-converter-page',
  templateUrl: './converter-page.component.html',
  styleUrls: ['./converter-page.component.css']
})

export class ConverterPageComponent implements OnInit {
  openedSecondary: boolean = false
  constructor (private readonly apiService: ApiConnService) {}
  data$: Observable<Currency[]> = new Observable<[]>()

  connect (): void {
    this.apiService.initFetching(this.apiService.firstCurrencies.concat(this.apiService.secondCurrencies))
  }

  ngOnInit (): void {
    this.apiService.initFetching(this.apiService.firstCurrencies)

    this.apiService.data$.pipe(
      pairwise(),
      map(([prev, curr]) => {
        for (let [index, value] of curr.entries()) {
          if (prev.length !== 0) {
            value = Object.assign(value, { diff: value.result - prev[index].result })
          } else {
            value = Object.assign(value, { diff: 0 })
          }
        }
      })
    ).subscribe()
    this.data$ = this.apiService.data$
  }
}
