import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/_models/genre.model';
import { GenreService } from '../../_services/genre.service'

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.scss']
})
export class AddGenreComponent implements OnInit {
  genres: Genre[];

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.genreService.refreshNeeded$
    .subscribe(() => {
      this.getAll()
    })
    this.getAll();
  }

  private getAll() {
    this.genreService.getAll()
    .subscribe(
      (genres: Genre[]) => this.genres = genres)
  }

}
