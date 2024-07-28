import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-domapi',
  templateUrl: './domapi.component.html',
  styleUrls: ['./domapi.component.scss']
})
export class DomapiComponent implements OnInit, AfterViewInit {
  bodyProperties: any;
  ngAfterViewInit(): void {
    this.domCreation()
  }
  ngOnInit(): void {
    this.bodyProperties = { ...this.document.body };
  }

  constructor(@Inject(DOCUMENT) private document: Document) {

  }


  object = {

    "Fleet Id/Serial Id": "FL-0022",
    "Call Signcode": "SR-022",
    "Permit Name": "Airside Application",
    "Approved Date": "2024-02-19T13:05:55",
    "Date Of Manufacture": "2023-11-30",
    "Permit Number": 'null',
    "Make": "INNOVA",
    "Vaild From": "2024-02-19T13:05:55",
    "Fleet Type": "Vehicle",
    "Company Name": "EITQA19",
    "Department": "nono",
    "Vaild Til": "2026-02-18T13:05:55",
    "Fuel/Electric Type": "petrol",
    "Engine Size": "1221CC",
    "Model": "CYRSTA",

  }





  $label: string = ` <label style="font-weight: 600; font-size: 1rem !important; display: flex;color: #000;text-align: center;font-family: Inter;font-size: 20px;font-style: normal;font-weight: 600;line-height: normal;text-transform: uppercase;"> quesCont </label>`
  $div: string = `<div style="background-color: rgba(195, 195, 195,0.3); font-size: 1rem !important; padding-top: 5px; padding-bottom: 5px; " class="col-12"> ansCont</div>`

  data = {
    label: ` <label style="font-weight: 600; font-size: 1rem !important; display: flex;color: #000;text-align: center;font-family: Inter;font-size: 20px;font-style: normal;font-weight: 600;line-height: normal;text-transform: uppercase;"> quesCont </label>`,
    divSq: `<div style="background-color: rgba(195, 195, 195,0.3); font-size: 1rem !important; padding-top: 5px; padding-bottom: 5px; " class="col-12"> ansCont</div>`,
    divCol: `<div  class="col-6" style="margin-top: 0.5rem;"> mainCont </div>`
  }



  domCreation() {

    const div = document.createElement('div');
    let mainDiv: HTMLElement = document.getElementById('mainDiv');
    let strData: string
    for (let i = 0; i < Object.entries(this.object).length; i++) {
      strData ? strData += this.data.divCol.replace('mainCont', this.data.label.replace('quesCont', Object.entries(this.object)[i][0]) + this.data.divSq.replace('ansCont', Object.entries(this.object)[i][1])) : strData = this.data.divCol.replace('mainCont', this.data.label.replace('quesCont', Object.entries(this.object)[i][0]) + this.data.divSq.replace('ansCont', Object.entries(this.object)[i][1]))
    }

    div.innerHTML = `<div style="border: 2px solid  rgba(128, 128, 128, 0.3);">
        <div style='height: 48rem;width: 595px;'>
            <div style="height: 13rem;background-color: antiquewhite;">
                <img src="../../assets/loginlogoRecentdec.jpg"  width="100%" height="100%">
                <div>
                    <div class="row" style="padding: 0.5rem 1.5rem 0 1.5rem;">                           
                       ${strData}                        
                    </div>
                </div>
        </div> 
    </div>`;
    // mainDiv.appendChild(div)

    document.body.style.padding = '50px'
    document.body.style.width = '700px'

    document.body.appendChild(div)
    

    this.generatePDF(document.body.appendChild(div))

  }

  generatePDF(content) {

    html2canvas(content).then(canvas => {
      // Convert canvas to an image
      const imgData = canvas.toDataURL('image/png');
      console.log(imgData)
      // Calculate dimensions for PDF
      // const imgWidth = 210; // mm
      // const pageHeight = 297; // mm
      // const imgHeight = (canvas.height * imgWidth) / canvas.width;
      // let heightLeft = imgHeight;

      // const pdf = new jsPDF('p', 'mm', 'a4');
      // let position = 0;

      // // Add image to PDF
      // pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      // heightLeft -= pageHeight;

      // // Add subsequent pages if content overflows
      // while (heightLeft >= 0) {
      //   position = heightLeft - imgHeight;
      //   pdf.addPage();
      //   pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      //   heightLeft -= pageHeight;
      // }

      // // Save PDF
      // pdf.save('generated.pdf');
    });
  }
}


