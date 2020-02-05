
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { DataService } from './data.service';

export interface User {
  name: string;
}

/**
 * @title Display value autocomplete
 */
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, AfterViewInit {

  private values = [];
  searchForm: FormGroup;

  constructor(
    private _dataService: DataService,
    private fb: FormBuilder) {
    this.createSearchForm();
  }

  ngOnInit() { }

  createSearchForm() {
    this.searchForm = this.fb.group({
      searchInput: [''],
    });
  }

  displayFn(option) {
      console.log(option)
    if (option) {
      return option.properties.label;
    } else {
      return '';
    }
  }


  ngAfterViewInit() {
    this.searchForm.controls.searchInput.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(newValue => {
        if (newValue && typeof newValue === 'string') {
          this._dataService.loadAddressService(newValue).subscribe(
            result => {
              result ? (this.values = result) : (this.values = []);
            },
            error => {
              this.values = null;
            }
          );
        }
      });
  }
}
