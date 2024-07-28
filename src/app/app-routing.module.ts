import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CRUDComponent } from './crud/crud.component';
import { NotesDetailComponent } from './notes-detail/notes-detail.component';
import { PdfComponent } from './pdf/pdf.component';
import { TestPdfComponent } from './test-pdf/test-pdf.component';
import { TestPdfImgaeComponent } from './test-pdf-imgae/test-pdf-imgae.component';
import { PrivateMailValidationComponent } from './private-mail-validation/private-mail-validation.component';
import { DomapiComponent } from './domapi/domapi.component';
import { PdfmakerComponent } from './pdfmaker/pdfmaker.component';

const routes: Routes = [
  {
    path: 'app', component: AppComponent
  },
  {
    path: 'crud', component: CRUDComponent
  },
  {
    path: 'notes', component: NotesDetailComponent
  },
  {
    path: 'pdf', component: PdfComponent
  },
  {
    path: 'test', component: TestPdfComponent
  },
  {
    path: 'img', component: TestPdfImgaeComponent
  },
  {
    path: 'mail', component: PrivateMailValidationComponent
  },
  {
    path: 'api', component: DomapiComponent
  },
  {
    path: 'make', component: PdfmakerComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
