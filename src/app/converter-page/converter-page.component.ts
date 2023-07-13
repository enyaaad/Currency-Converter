import { Component, OnInit } from '@angular/core'
import { ApiConnService } from '../services/apiconn.service'
import { BehaviorSubject, map, Observable, of, pairwise } from 'rxjs'
import { Currency } from '../models/currency'

@Component({
  selector: 'app-converter-page',
  templateUrl: './converter-page.component.html',
  styleUrls: ['./converter-page.component.sass']
})

export class ConverterPageComponent implements OnInit {
  constructor (private readonly apiService: ApiConnService) {}
  data$: Observable<Currency[]> = new Observable<[]>()
  // for debug
  // results: BehaviorSubject<Currency[]> = new BehaviorSubject<Currency[]>([])
  // data$: Observable<Currency[]> = this.results.asObservable()

  connect (): void {
    this.apiService.toggleParams()
  }
  // for debug
  // imit (): void {
  //   setTimeout(() => {
  //     this.results.next(data)
  //   }, 5000)
  //   setTimeout(() => {
  //     this.results.next(data2)
  //   }, 10000)
  //   setTimeout(() => {
  //     this.results.next(data)
  //   }, 15000)
  //   setTimeout(() => {
  //     this.results.next(data2)
  //   }, 20000)
  // }

  ngOnInit (): void {
    // for debug
    // this.imit()

    this.apiService.initFetching()

    this.data$ = this.apiService.data$

    this.data$.pipe(
      pairwise(),
      map(([prev, curr]) => {
        const diffs: number[] = this.calculateDiff(curr, prev)
        curr.forEach((el, index) => {
          el.diff = Math.floor((diffs[index] * 1000) / 1000)
        })
      })
    ).subscribe()
  }

  calculateDiff (current: Currency[], previous: Currency[]): number[] {
    if (previous.length > 0) {
      const result: number[] = []

      for (let i = 0; i < current.length; i++) {
        const obj1 = current[i]
        if (previous[i].result === undefined) {
          previous[i].result = 0
        }
        const obj2 = previous[i]

        const subtractedValue = obj1.result - obj2.result
        result.push(subtractedValue)
      }
      return result
    }
    return []
  }

  protected readonly Math = Math
}
