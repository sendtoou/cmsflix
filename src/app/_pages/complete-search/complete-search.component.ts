import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { SerieService } from 'src/app/_services/serie.service';
import { Serie } from 'src/app/_models/serie.model'
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { generateKeyPairSync } from 'crypto';

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
  serieList: Serie[] = [];

  // @ViewChild("fruitInput") fruitInput: ElementRef<HTMLInputElement>;
  // @ViewChild("auto") matAutocomplete: MatAutocomplete;
  constructor(private serieService: SerieService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {


    this.allSeries = this.serieService.getAll().pipe(
      filter(data => !!data),
      map((data) => data.filter(item => item.title?.en !== undefined))
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
    //   map((data) => data.filter(item => item.title?.en !== undefined)))//check if db has no object(show only has collection)
    // const searchValues$ = this.myControl.valueChanges.pipe(
    //   startWith(''), 
    //   map(val => val.toLowerCase()));
    // this.filteredOptions = combineLatest([ingredients$, searchValues$]).pipe(
    //   // map(([list, searchVal]) => list.filter(item => item.title?.en.toLowerCase().includes(searchVal))));
    //   map(([list, searchVal]) => list.filter(item => item.genres[1]?.name?.en.toLowerCase().includes(searchVal))));

  }


  //   const data = [{"guid":"j5Dc9Z","courses":[{"id":3,"name":"foo"}]},{"guid":"a5gdfS","courses":[{"id":1,"name":"bar"},{"id":3,"name":"foo"}]},{"guid":"jHab6i","courses":[{"id":7,"name":"foobar"}]}];
  // const courses = [1, 6, 3];

  // const r = data.filter(d => d.courses.every(c => courses.includes(c.id)));
  // console.log(r);



  private _filter(value: string) {
    let filterValue = '';
    if (value) {
      filterValue = value.toLowerCase()
      return this.allSeries.pipe(
        filter(data => !!data),
        map((data) => {
          return data.filter(option => option.title?.en.toLowerCase().includes(value)), data.filter(g => g.genres.some((item: any) => item.name?.en.toLowerCase().includes(value)))
        })

        //map((data) => {
        // return data.filter(g => g.genres.some(item => item.name?.en.toLowerCase().includes(value)))
        // })






      )


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

  onSubmit() {
    console.log(this.serieControl.value);
  }


}

