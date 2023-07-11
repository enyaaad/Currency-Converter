import { Component, OnInit } from '@angular/core'
import { ApiConnService } from '../services/apiconn.service'

@Component({
  selector: 'app-converter-page',
  templateUrl: './converter-page.component.html',
  styleUrls: ['./converter-page.component.css']
})

export class ConverterPageComponent implements OnInit {

  private openedSecondary: boolean = false
  constructor (private readonly apiService: ApiConnService) {}

  connect (): void {
    this.openedSecondary = true
  }

  ngOnInit (): void {
    // this.apiService.fetchData(this.apiService.firstCurrencies)

    this.apiService.data$.subscribe(
      (value) => {
        console.log(value)
      }
    )
    // from(this.apiService.responses).subscribe(elem => { console.log(elem) })
  }
  // this.subscription = interval(5000).pipe(
  //   map(() => this.apiService.getData())
  // )
}
