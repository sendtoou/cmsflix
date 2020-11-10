import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CelebService } from '../celebs.service'
import { Celeb } from '../celebs.model'
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-celeb-lang',
  templateUrl: './celeb-lang.component.html',
  styleUrls: ['./celeb-lang.component.scss']
})
export class CelebLangComponent implements OnInit {

  displayedColumns: string[] = ['name',];
  listData = new MatTableDataSource<Celeb>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  films: any = [];
  // series: any = [];
  constructor(private celebService: CelebService) { }

  ngOnInit(): void {
    this.getAll()
  }


  public getAll() {
    this.celebService.getAll()
      .subscribe(res => {
        this.listData.data = res as Celeb[];
        console.log('dfsdf', this.listData.data)
        this.films = res;
      })

    // this.listData.filterPredicate = (data, filter: string)  => {
    //   console.log('data',data);
    //   console.log('filter',filter);
    //   const accumulator = (currentTerm, key) => {
    //     return key === 'name' ? currentTerm + data.name.th : currentTerm + data[key];
    //   };
    //   const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
    //   // Transform the filter by converting it to lowercase and removing whitespace.
    //   const transformedFilter = filter.trim().toLowerCase();
    //   return dataStr.indexOf(transformedFilter) !== -1;
    // };
    // });
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();//value.trim().toLocaleLowerCase();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

}
