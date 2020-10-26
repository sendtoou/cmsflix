import { Component, OnInit } from '@angular/core';
import { Celeb } from '../celebs.model'
import { CelebService } from '../celebs.service'

@Component({
  selector: 'app-celeb-list',
  templateUrl: './celeb-list.component.html',
  styleUrls: ['./celeb-list.component.scss']
})
export class CelebListComponent implements OnInit {
  celebs: Celeb[];

  constructor(private celebService: CelebService) { }

  ngOnInit(): void {
    this.celebService.refreshNeeded$
    .subscribe(() => {
      this.getAll()
    })
    this.getAll();
  }

  private getAll() {
    this.celebService.getAll()
    .subscribe(
      (celebs: Celeb[]) => this.celebs = celebs)
  }

}
