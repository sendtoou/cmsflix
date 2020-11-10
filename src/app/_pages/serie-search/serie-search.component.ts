import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SerieService } from 'src/app/_services/serie.service';
import { Serie } from 'src/app/_models/serie.model'
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-serie-search',
  templateUrl: './serie-search.component.html',
  styleUrls: ['./serie-search.component.scss']
})
export class SerieSearchComponent implements OnInit {

  serieControl = new FormControl([]);
  filterControl = new FormControl();
  serieList: Serie[] = [];
  
  constructor(private serieService: SerieService, private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    
    
    this.serieService.getAll().subscribe(data => {
      this.serieList = data;
      console.log('dsfsdf', this.serieList)
    });
    
  }

  onRemoved(serie: string) {
    const series = this.serieControl.value as string[];
    this.removeFirst(series, serie);
    this.serieControl.setValue(series); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }



}
