import { Component, OnInit } from '@angular/core'
import { ApiConnService } from '../services/apiconn.service'
import { Observable, of } from 'rxjs'
import { Currency } from '../models/currency'

@Component({
  selector: 'app-converter-page',
  templateUrl: './converter-page.component.html',
  styleUrls: ['./converter-page.component.css']
})

export class ConverterPageComponent {
  private readonly currencies: string[] = ['USD', 'EUR', 'GBP', 'CNY', 'JPY', 'TRY']
  constructor (private readonly apiConn: ApiConnService) {
  }

  connect (): void {
    this.currencies.forEach(currency => {
      this.apiConn.convertCurrency(currency, 'rub', 1)
    })
  }
}
