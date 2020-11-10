import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CelebService } from '../celebs.service'
import { Celeb } from '../celebs.model'
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-celeb-table',
  templateUrl: './celeb-table.component.html',
  styleUrls: ['./celeb-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CelebTableComponent implements OnInit {

  displayedColumns: string[] = ['name.th', 'name.en', 'name.ch', 'manage'];
  listData = new MatTableDataSource<Celeb>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private celebService: CelebService) { }

  ngOnInit(): void {
    this.getAll();
  }

  public getAll() {
    this.celebService.getAll().subscribe(stream => {
      this.listData = new MatTableDataSource(stream);
      this.listData.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'name.th': return item.name.th;
          case 'name.en': return item.name.en;
          case 'name.ch': return item.name.ch;
          default: return item[property];
        }
      };
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      // this.listData.filterPredicate = (data, filter) => {
      //   return this.displayedColumns.some(ele => {
      //     return ele != 'manage' && data[ele].toString().trim().toLowerCase().indexOf(filter) !== -1;
      //   });
      // };

      // this.listData.filterPredicate = (data: any, filter: string) => {
      //   let matchFound = false;
      //   for (let column of this.displayedColumns) {
      //     if(column in data) {
      //       if(data[column]) {
      //         matchFound = (matchFound || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1)
      //       }
      //     }
      //   }
      //   return matchFound;
      // }
     


      this.listData.filterPredicate = (data, filter: string)  => {
        console.log('data',data);
        console.log('filter',filter);
        const accumulator = (currentTerm, key) => {
          return key === 'name' ? currentTerm + data.name.th : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

   

    });
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();//value.trim().toLocaleLowerCase();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  // public getAll() {
  //   this.celebService.getAll()
  //   .subscribe(res => {
  //     this.listData.data = res as Celeb[];
  //   })
  // }


  // ngOnInit() {
  //   this.dataSource = new MatTableDataSource(yourData);
  //   this.dataSource.sortingDataAccessor = (item, property) => {
  //     switch(property) {
  //       case 'project.name': return item.project.name;
  //       default: return item[property];
  //     }
  //   };
  //   this.dataSource.sort = sort;
  // }

  // public redirectToDetails = (id: string) => {

  // }
}


