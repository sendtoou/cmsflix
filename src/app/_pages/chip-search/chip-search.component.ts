import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { SerieService } from 'src/app/_services/serie.service';

@Component({
  selector: 'app-chip-search',
  templateUrl: './chip-search.component.html',
  styleUrls: ['./chip-search.component.scss']
})
export class ChipSearchComponent implements OnInit {
  serieControl = new FormControl([]);
  filterControl = new FormControl();
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  allSeries: Observable<any[]>;
  serieList:  string[] = [];//Serie[] = [];
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

   onRemoved(multiSelect: MatSelect, matChipIndex: number) {
    const selectedSeries = [...this.serieControl.value];
    selectedSeries.splice(matChipIndex, 1);
    this.serieControl.patchValue(selectedSeries);

    multiSelect.writeValue(selectedSeries);
  }


}
