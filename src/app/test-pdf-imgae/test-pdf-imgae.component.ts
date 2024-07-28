import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-test-pdf-imgae',
  templateUrl: './test-pdf-imgae.component.html',
  styleUrls: ['./test-pdf-imgae.component.scss']
})
export class TestPdfImgaeComponent {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  generatePDF() {
    const pdf = new jsPDF();
    const content: HTMLElement = this.pdfContent.nativeElement;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imageRatio = canvas.width / canvas.height;
      const pdfRatio = pdfWidth / pdfHeight;
      let imgWidth = pdfWidth;
      let imgHeight = pdfHeight;

      if (imageRatio < pdfRatio) {
        imgHeight = pdfHeight * imageRatio;
      } else {
        imgWidth = pdfWidth * (1 / imageRatio);
      }

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('generated.pdf');
    });
  }
}
