import { Component, OnInit } from '@angular/core'
import { ApiConnService } from '../services/apiconn.service'
import { Observable } from 'rxjs'
import { Currency } from '../models/currency'

@Component({
  selector: 'app-converter-page',
  templateUrl: './converter-page.component.html',
  styleUrls: ['./converter-page.component.sass']
})

export class ConverterPageComponent implements OnInit {
  constructor (private readonly apiService: ApiConnService) {}
  data$: Observable<Currency[]> = new Observable<[]>()

  connect (): void {
    this.apiService.toggleParams()
  }

  ngOnInit (): void {
    this.apiService.initFetching()

    this.data$ = this.apiService.data$
  }

  protected readonly Math = Math
}
