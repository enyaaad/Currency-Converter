import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { ConverterPageComponent } from './converter-page/converter-page.component'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    ConverterPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
