import { Component } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CRUDComponent {
  public object = {
    first: "", last: ""
  }

  constructor(private storage: StorageService) {

  }
  array: any;

  onSubmit(): any {
    if (this.object.first == "" || this.object.last == "") {
      return null;
    }
    this.storage.myArray.push(this.object);
    this.object = {
      first: "", last: ""
    }
    console.log(this.storage.myArray, ",yarra")
    this.getData()
  }

  getData() {
    this.array = this.storage.myArray
  }
  remove(index: any) {
    console.log("remove", index)
  }
}
