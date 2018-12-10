import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FakerDecorator } from './services/utils/faker-decorator';
import { ConfirmComponent } from './modules/shared/modal/confirm/confirm.component';
import { MatDialogModule } from '@angular/material';
import { ConfirmationService } from './modules/shared/modal/confirm/confirmation-service';
import { ApiService } from './services/api/api-service';
import { AboutGWE } from './services/utils/about';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
  ],
  exports: [
    ConfirmComponent
  ],
  providers: [
    FakerDecorator,
    AboutGWE,
    ApiService,
    ConfirmationService
  ],
  entryComponents: [
    ConfirmComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
