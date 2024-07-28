import { Component, OnInit } from '@angular/core';
import { privateMailBlocker } from '../abstract/custom-validator';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-private-mail-validation',
  templateUrl: './private-mail-validation.component.html',
  styleUrls: ['./private-mail-validation.component.scss']
})
export class PrivateMailValidationComponent implements OnInit {
  email: string;
  constructor(private prvtmail: privateMailBlocker) {

  }
  ngOnInit(): void {
    console.log(this.prvtmail, 'pvrt');

  }
  studentstring: Observable<string>
  validationController() {
    // this.prvtmail.validate()
    // this.studentstring = of('Mohammad Ibrahim Ayoob N');
    // this.studentstring.subscribe(res => {
    //   // this.prvtmail.validate()
    // })

    // let text = 'ayoob@gmail.com'; 
    // let test = this.prvtmail.validate(text);
    // console.log(this.prvtmail.validate(text), 'test validation');



  }
}
