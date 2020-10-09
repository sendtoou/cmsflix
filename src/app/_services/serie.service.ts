import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { apiUrl } from '../url.constant';
import { Serie } from '../_models/serie.model';
import { Message } from '../_models/message.model';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<Serie[]>(apiUrl.serie);
  }

  //   getCampageUrl(uuid){
  //     return environment.apiUrl + '/campaign/'+uuid+'/activation/';
  //  }
  getOne(id: string): Observable<any> {
    return this.http.get<Serie>(apiUrl.serie + '/' + id);
  }

  // create(data: any): Observable<any> {
  //   return this.http.post<any>(apiUrl.serie, data)
  // }
  create(serie: any): Observable<Message> {
    return this.http.post<Message>(apiUrl.serie, serie)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  update(id, data): Observable<any> {
    return this.http.put(apiUrl.serie + '/' + id, data)
  }

  delete(id): Observable<any> {
    return this.http.delete(`${apiUrl.serie}/delete/${id}`)
  }

  deleteAll(): Observable<any> {
    return this.http.delete(apiUrl.serie)
  }

  // findByTitle(title): Observable<any> {
  //   return this.http.get(apiUrl.serie)?'title'${title}
  // }

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
