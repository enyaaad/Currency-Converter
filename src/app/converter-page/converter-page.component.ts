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
  private openedSecondary: boolean = false
  constructor (private readonly apiService: ApiConnService) {}
  data$: Observable<Currency[]> = new Observable<[]>()
  connect (): void {
    this.openedSecondary = true
  }

  ngOnInit (): void {
    this.apiService.initFetching(this.apiService.firstCurrencies)
    this.data$ = this.apiService.data$

    this.apiService.data$.pipe(
      pairwise(),
      map(([prev, curr]) => {
        for (const [index, value] of curr.entries()) {
          if (prev.length !== 0) { value.diff = value.result - prev[index].result } else { value.diff = 0 }
        }
      })
    ).subscribe()
  }
}
