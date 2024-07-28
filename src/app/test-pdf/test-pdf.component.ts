import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
// import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-test-pdf',
  templateUrl: './test-pdf.component.html',
  styleUrls: ['./test-pdf.component.scss']
})
export class TestPdfComponent {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {

  }

  @ViewChild('content', { static: false }) el!: ElementRef
  USERS = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "nathan@yesenia.net",
      "phone": "1-463-123-4447",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "julianne@kory.org",
      "phone": "493-170-9623 x156"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "lucio@annie.ca",
      "phone": "(254)954-1289"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "email": "karley@jasper.info",
      "phone": "1-477-935-8478 x6430"
    }
  ];

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      // PDF.save('angular-demo.pdf');
      // const pdfBlob = PDF.output('blob');
      // this.convertToBase64(pdfBlob);
      const pdfBase64 = PDF.output('datauristring');
      console.log(pdfBase64, '  ')
    });
  }

  convertToBase64(blob: Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String: string = reader.result as string;
      console.log(base64String);
    };
    reader.readAsDataURL(blob);

  }


  async s3BucketRunner(base64: any) {
    const testData: FormData = new FormData();
    const api = await fetch(base64);
    const blob = await api.blob();
    const default_file = new File([blob], "File name", {
      type: "image/png",
    });
    testData.append("invoicedocument", default_file);
    // testData.append("data", JSON.stringify(data));
  }



  download() {
    var element = document.getElementById('htmlData');
    var opt = {
      margin: 1,
      filename: 'output.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // New Promise-based usage:
    // html2pdf().from(element).set(opt).save();
  }




  generatePDF() {
    const doc = new jsPDF();
    doc.text('Hello, this is a PDF!', 10, 10);


    const pdfBase64 = doc.output('datauristring');
    doc.save('test.pdf');

    console.log(pdfBase64); // This will log the base64 representation of the PDF
  }

  image: any

  testGenPdf() {
    var doc;
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        // pdf.save('demo.pdf')
        this.image = pdf.output('datauristring');
        this.blobData()
        // this.imageConsole();
      }
    })
  }

  async blobData() {


    const api = await fetch(this.image);
    const blob = await api.blob();
    const default_file = new File([blob], "File name.pdf", {
      type: "pdfs",
    });

    this.savePdf(default_file)
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

    this.http.post('http://192.168.0.129:8082/Admin/DCDesignDataServlet/fileupload', testData).subscribe(res => {
      console.log(res, "response")
    })
  }





  blob: string


  getImageAsBlob() {
    this.http.get('https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/Terms+and+conditions.jpg', { responseType: 'blob' }).subscribe((blob: Blob) => {
      console.log(blob); // Here is the Blob object
      // You can use the Blob object as needed
      // this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      let t = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));

    });
  }



  imageConsole() {
    console.log(this.image);
    var image = new Image();
    image.src = this.image;
    // console.log(document.body.appendChild(image))


    // document.getElementById('imageDiv').appendChild(image)
    // const myImageElement = document.getElementById('imgElem') as HTMLImageElement;

    // if (myImageElement) {
    //   myImageElement.src = 'path/to/your/image.jpg';
    // }

    // let baseStr64 = this.image;


    // document.getElementById('imgElem').  
  }



  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;





  ImagePdf() {
    const pdf = new jsPDF();
    const content: HTMLElement = this.el.nativeElement;

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













  pdfData = {
    data: [
      { colSize: 'col-4', label: "Company", answers: "Bad Ass" },
      { colSize: 'col-4', label: "Call Sign Code", answers: "Dass Leo" },
      { colSize: 'col-4', label: "Fleet ID", answers: "Dass And Co" },
      { colSize: 'col-4', label: "Permit Number", answers: "Every bOdy" },
      { colSize: 'col-4', label: "Category", answers: "Listen " },
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



  exportPDF(id: any) {
    // const options = {
    //   filename: 'INV' + id + '.pdf',
    //   image: { type: 'jpeg', quality: 0.98 },
    //   html2canvas: {
    //     scale: 2, dpi: 300,
    //     letterRendering: true,
    //     useCORS: true
    //   },
    //   jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    // }
    // var element = document.getElementById('export-content');
    // var d = html2pdf().from(element).set(options).save();

    // const formData: FormData = new FormData();
    // formData.append('file', d);

    // Service for upload file in s3 bucket
    // this._uploadService.upload('invoice', formData).subscribe(res => {
    //   console.log(res);
    // }, (error: any) => {
    //   console.log(error, 'error');
    // });
  }

  // if (file.queue.length != 0......0) {
  //   testData.append("invoicedocument", file.queue[0]._file);
  //   testData.append("data", JSON.stringify(data));
  // } else {
  //   const api = await fetch(this.pdfLogoService.imgdata.no_img);
  //   const blob = await api.blob();
  //   const default_file = new File([blob], "File name", {
  //     type: "image/png",
  //   });
  //   testData.append("invoicedocument", default_file);
  //   testData.append("data", JSON.stringify(data));
  // }


  convertToBase642() {
    this.http.get('https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/Terms+and+conditions.jpg', { responseType: 'blob' }).subscribe((blob: Blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        // this.blob = base64data
        const file = new File([blob], `image`, { type: blob.type });
        console.log(file)
      };
    });
  }

  imageUrl: string
  fetchAndDisplayImage() {
    const s3ImageUrl = 'https://goldenelement.s3.ap-southeast-1.amazonaws.com/onboard/Terms+and+conditions.jpg';
    this.http.get(s3ImageUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        this.imageUrl = base64data;
      };
    });
  }

}

function html2pdf() {
  throw new Error('Function not implemented.');
}

// arabic form pdf download

    // html2canvas(this.companyfinalarabic.nativeElement).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/jpeg');
    //   const pdf = new jsPDF({
    //     orientation: "portrait"
    //   })
    //   const ImageProperties = pdf.getImageProperties(imgData);
    //   const pdfw = pdf.internal.pageSize.getWidth();
    //   const pdfh = (ImageProperties.height * pdfw) / ImageProperties.width;
    //   const marginTop = 20;
    //   pdf.addImage(imgData, 'PNG', 0, marginTop, pdfw, pdfh);
    //   pdf.save(`${sessionStorage.company}.pdf`);
    // })