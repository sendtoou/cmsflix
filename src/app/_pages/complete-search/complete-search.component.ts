import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { SerieService } from 'src/app/_services/serie.service';
import { Serie } from 'src/app/_models/serie.model'
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-complete-search',
  templateUrl: './complete-search.component.html',
  styleUrls: ['./complete-search.component.scss']
})

export class CompleteSearchComponent implements OnInit {

  serieControl = new FormControl([]);
  filterControl = new FormControl();
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  allSeries: Observable<any[]>;
  serieList:  string[] = [];//Serie[] = [];

  @ViewChild("fruitInput") fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  constructor(private serieService: SerieService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

   
    this.allSeries = this.serieService.getAll().pipe(
      filter(data => !!data),
      map((data) => data.filter(item => item.title?.th !== undefined))
    )
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filter(value))
    );


    // this.serieService.getAll().pipe(
    //   map((data) =>{
    //   data.filter(item => item.title?.th !== undefined)
    //  }))
    // .subscribe(result =>{
    //   this.allSeries = result
    // });





    // const ingredients$ = this.serieService.getAll().pipe(
    //   filter(data => !!data),
    //   map((data) => data.filter(item => item.title?.th !== undefined)))//check if db has no object(show only has collection)
    // const searchValues$ = this.myControl.valueChanges.pipe(
    //   startWith(''), 
    //   map(val => val.toLowerCase()));
    // this.filteredOptions = combineLatest([ingredients$, searchValues$]).pipe(
    //   map(([list, searchVal]) => list.filter(item => item.title?.th.toLowerCase().includes(searchVal))));

  }

  private _filter(value: string) {
    let filterValue = '';
    if (value) {
      filterValue = value.toLowerCase()
      return this.allSeries.pipe(
        filter(data => !!data),
        map((data) => {
          return data.filter(option => option.title?.th.toLowerCase().includes(value))
        })
      );
    } else {
      return this.allSeries
    }
  }

  onRemoveFruit(multiSelect: MatSelect, matChipIndex: number) {
    const selectedFruits = [...this.serieControl.value];
    selectedFruits.splice(matChipIndex, 1);
    this.serieControl.patchValue(selectedFruits);

    multiSelect.writeValue(selectedFruits);
  }

  // onRemoved(serie: string) {
  //   const series = this.serieControl.value as string[];
  //   this.removeFirst(series, serie);
  //   this.serieControl.setValue(series); // To trigger change detection
  // }

  // private removeFirst<T>(array: T[], toRemove: T): void {
  //   const index = array.indexOf(toRemove);
  //   if (index !== -1) {
  //     array.splice(index, 1);
  //   }
  // }
  // onRemoved(serie: string): void {
  //   const index = this.allSeries.indexOf(serie);

  //   if (index >= 0) {
  //     this.allSeries.splice(index, 1);
  //   }
  // }

}


