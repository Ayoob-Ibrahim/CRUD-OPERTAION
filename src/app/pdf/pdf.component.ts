import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {
  @ViewChild('content', { static: false }) el!: ElementRef
  title: string = "Pdf format document";
  constructor(private http: HttpClient,) { }

  convertToBase64(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String: string = reader.result as string; // Base64 string
      // Here you can use the base64String or send it to the backend
      // this.sendBase64ToBackend(base64String);
      console.log(base64String)
    };
    reader.readAsDataURL(file);
  }



  fileUploads(event: any) {
    console.log(event)
  }

  createPdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
         pdf.save('demo.pdf')
        const pdfBlob = pdf.output('datauristring');
        this.savePdf(pdfBlob)
      }
    })
    // this.convertToBase64(pdf);
  }



  savePdf(pdf: any) {
    const testData: FormData = new FormData();
    let data =
    {
      "header":
      {
        "name": "Fleetpermit",
        "method": "POST"
      }, "body":
      {
        "associatedapplication": "Airporrr",
        "permitname": "Airsidee",
        "fleetid": "12",
        "permittype": "Permanent",
        "status": "Applied",
        "createddate": "2023-12-21",
        "comment": "Comments"
      }
    }
    testData.append("files", pdf);
    testData.append("data", JSON.stringify(data));
     
    this.http.post('http://192.168.1.52:8082/Admin/DCDesignDataServlet/fileupload', testData).subscribe(res => {
      console.log(res, "response")
    })
  }




  testFn(content: any) {
    console.log(content)
  }





  pdfData = {
    data: [
      { colSize: 'col-4', label: "Company", answers: "AFI Company" },
      { colSize: 'col-4', label: "Call Sign Code", answers: "jvt34324" },
      { colSize: 'col-4', label: "Fleet ID", answers: "534" },
      { colSize: 'col-4', label: "Permit Number", answers: "5656" },
      { colSize: 'col-4', label: "Category", answers: "Motorized" },
      { colSize: 'col-4', label: "Make", answers: "Motorized" },
      { colSize: 'col-4', label: "Model", answers: "Motorized" },
      { colSize: 'col-4', label: "Fleet Type", answers: "Motorized" },
      { colSize: 'col-4', label: "Contact", answers: "9841258576" },
      { colSize: 'col-4', label: "Valid From", answers: "12-05-2023" },
      { colSize: 'col-8', label: "Permit Name", answers: "AIRSIDE operation license" },
      { colSize: 'col-4', label: "Valid Till", answers: "12-05-2025" },
      { colSize: 'col-8', label: "Email ID", answers: "@gmaiul.com" },
    ]
  }







}







