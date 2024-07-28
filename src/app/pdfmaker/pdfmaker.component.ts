import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
@Component({
  selector: 'app-pdfmaker',
  templateUrl: './pdfmaker.component.html',
  styleUrls: ['./pdfmaker.component.scss']
})
export class PdfmakerComponent implements OnInit{



  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }
  ngOnInit(): void {
    setTimeout(() => {
      console.log('function trigger')
      this.convertBase64ToPdf()
    }, 5000);
  }





  convertBase64ToPdf() {
    const base64Image1 = '';
    const base64Image2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchLAAAAAElFTkSuQmCC';

    const docDefinition = {
      content: [
        {
          image: base64Image1,
          width: 500
        },
        {
          image: base64Image2,
          width: 500
        }
      ]
    };

    const pdf = pdfMake.createPdf(docDefinition);
    pdf.download('my-pdf.pdf');
  }
}

