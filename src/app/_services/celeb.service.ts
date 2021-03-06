import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError  } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { apiUrl } from '../url.constant';
import { Celeb } from '../_models/celeb.model';

@Injectable({
  providedIn: 'root'
})
export class CelebService {
  constructor(private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getAll(): Observable<Celeb[]> {
    return this.http.get<Celeb[]>(apiUrl.celeb);
  }

  getOne(id: string): Observable<Celeb> {
    return this.http.get<Celeb>(apiUrl.celeb + '/' + id);
  }

  // create(celeb: Celeb): Observable<Celeb> {
  //   return this.http.post<Celeb>(apiUrl.celeb, celeb)
  //     .pipe(
  //       retry(3),
  //       catchError(this.handleError)
  //     );
  // }
  create(celeb: Celeb): Observable<Celeb> {
    return this.http.post<Celeb>(apiUrl.celeb, celeb)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    )
  }

  update(id, data): Observable<any> {
    return this.http.put(apiUrl.celeb + '/' + id, data)
  }

  delete(id): Observable<any> {
    return this.http.delete(`${apiUrl.celeb}/delete/${id}`)
  }

  deleteAll(): Observable<any> {
    return this.http.delete(apiUrl.celeb)
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