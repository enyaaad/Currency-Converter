import { Component, OnInit } from '@angular/core'
import { ApiConnService } from '../services/apiconn.service'
import { empty, Observable } from "rxjs";
import { Currency } from "../models/currency";

@Component({
  selector: 'app-converter-page',
  templateUrl: './converter-page.component.html',
  styleUrls: ['./converter-page.component.css']
})

export class ConverterPageComponent implements OnInit {
  private openedSecondary: boolean = false
  constructor (private readonly apiService: ApiConnService) {}
  data$: Observable<Currency[]> = empty()
  connect (): void {
    this.openedSecondary = true
  }

  ngOnInit (): void {
    this.apiService.initFetching(this.apiService.firstCurrencies)

    this.apiService.data$.subscribe(
      (value) => {
        console.log(value)
      }
    )

    this.data$ = this.apiService.data$
  }
}
