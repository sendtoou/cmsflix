import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SerieService } from 'src/app/_services/serie.service';
import { Serie } from 'src/app/_models/serie.model'
import { debounceTime, tap, switchMap, finalize, startWith, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { title } from 'process';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<Serie[]>;

  allSeries: Observable<Serie[]>;

  constructor(private formBuilder: FormBuilder, private serieService: SerieService) { }

  ngOnInit(): void {

    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     switchMap(value => this._filter(value))
    //   );

    this.allSeries = this.serieService.getAll();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this._filter(value))
      );
  }
  // private _filter(value: string) {
  //   // const filterValue = value.toLowerCase();
  //   return this.serieService.getAll().pipe(
  //     filter(data => !!data),
  //     map((data) => {
  //       return data.filter(option => option.title?.th.toLowerCase().includes(value))
  //     })
  //   )
  // }

  // const filteredItems = items.filter(item => item.title !== undefined)

  private _filter(value: string) {
    let filterValue = '';
    if (value) {
      filterValue = value.toLowerCase()
      return this.allSeries.pipe(
        filter(data => !!data),
        map((data) => {
          const filteredItems = data.filter(item => item.title?.th !== undefined) // check title.th has object
          return filteredItems.filter(option => option.title?.th.toLowerCase().includes(value))
        })
      );
    } else {
      return this.allSeries
    }
  }




  // displayFn(myControl?: Serie): string | undefined {
  //   return myControl ? myControl.title.th : undefined;
  // }

  // displayFn(value?: Serie) {
  //   return value ? value.title.th : undefined;
  // }

  // displayFn(options: Serie[]): (id: string) => string | null {
  //   return (id: string) => { 
  //     const correspondingOption = Array.isArray(options) ? options.find(option => option.id === id) : null;
  //     return correspondingOption ? correspondingOption.title.th : '';
  //   }
  // }

}






