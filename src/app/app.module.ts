import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputAreaComponent } from './Components/input-area/input-area.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { OutputAreaComponent } from './Components/output-area/output-area.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    InputAreaComponent,
    HeaderComponent,
    FooterComponent,
    OutputAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    InputAreaComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
