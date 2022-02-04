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
import { HttpClientModule } from '@angular/common/http';
import { GeneralConfigAreaComponent } from './Components/general-config-area/general-config-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    InputAreaComponent,
    HeaderComponent,
    FooterComponent,
    OutputAreaComponent,
    GeneralConfigAreaComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [
    InputAreaComponent,
    GeneralConfigAreaComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
