import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { apiUrl } from '../url.constant';
import { Genre } from '../_models/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

   getAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(apiUrl.genre).pipe(map(res => res))
  }

  // getAll(): Observable<Serie[]> {
  //   return this.http.get<Serie[]>(apiUrl.serie).pipe(map(res => res))//(map((res: any) => res.json()));
  // }
  //   getCampageUrl(uuid){
  //     return environment.apiUrl + '/campaign/'+uuid+'/activation/';
  //  }
  getOne(id: string): Observable<any> {
    return this.http.get<Genre>(apiUrl.genre + '/' + id);
  }

  // create(data: any): Observable<any> {
  //   return this.http.post<any>(apiUrl.serie, data)
  // }

  // create(celeb: Celeb): Observable<Celeb> {
  //   return this.http.post<Celeb>(apiUrl.celeb, celeb)
  //     .pipe(
  //       retry(3),
  //       catchError(this.handleError)
  //     );
  // }

  create(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(apiUrl.genre, genre)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    )
  }

  update(id, data): Observable<any> {
    return this.http.put(apiUrl.genre + '/' + id, data)
  }

  delete(id): Observable<any> {
    return this.http.delete(`${apiUrl.genre}/delete/${id}`)
  }

  deleteAll(): Observable<any> {
    return this.http.delete(apiUrl.genre)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}
