import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CRUDComponent } from './crud/crud.component';
import { FormsModule } from '@angular/forms';
import { NotesDetailComponent } from './notes-detail/notes-detail.component';
import { PdfComponent } from './pdf/pdf.component';
import { HttpClientModule } from "@angular/common/http";
import { TestPdfComponent } from './test-pdf/test-pdf.component';
import { TestPdfImgaeComponent } from './test-pdf-imgae/test-pdf-imgae.component';
import { PrivateMailValidationComponent } from './private-mail-validation/private-mail-validation.component';
import { privateMailBlocker } from './abstract/custom-validator';
import { DomapiComponent } from './domapi/domapi.component';
import { PdfmakerComponent } from './pdfmaker/pdfmaker.component';
@NgModule({
  declarations: [
    AppComponent,
    CRUDComponent,
    NotesDetailComponent, 
    PdfComponent, TestPdfComponent, TestPdfImgaeComponent, PrivateMailValidationComponent, DomapiComponent, PdfmakerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [privateMailBlocker],
  bootstrap: [AppComponent]
})
export class AppModule { }
