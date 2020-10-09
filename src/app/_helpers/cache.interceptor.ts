import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, empty, throwError, Subject, BehaviorSubject, of } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { CacheService } from '../_services/http-cache.service' 

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cacheService: CacheService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if (!this.canCache(req)) {
    //   return next.handle(req);
    // }

    // const cachedResponse = this.cache.get(req);
    // if (cachedResponse !== null) {
      
    //   console.log(`Response from cache: ${cachedResponse}`);
    //   return of(cachedResponse);
    // }
    // return next.handle(req).pipe(
    //   tap(event => {
    //     if (event instanceof HttpResponse) {
    //       console.log(`Response from Server and adding request to cache: ${req}`);
    //       this.cache.put(req, event);
    //     }
    //   })
    // );











    // pass along non-cacheable requests and invalidate cache  
    if (req.method !== 'GET') {
      console.log(`Invalidating cache: ${req.method} ${req.url}`);
      this.cacheService.invalidateCache();
      return next.handle(req);
    }

    // attempt to retrieve a cached response  
    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

    // return cached response  
    if (cachedResponse) {
      console.log(`Response from cache: ${cachedResponse.url}`);
      console.log(cachedResponse);
      return of(cachedResponse);
    }

    // send request to server and add response to cache  
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(`Response from Server and adding request to cache: ${req.url}`);
            this.cacheService.put(req.url, event);
          }
        })
      );




    // continue request if not cacheable.
    // if (!this.canCache(req)) {
    //   return next.handle(req);
    // }
    // canCache(req: HttpRequest<any>): boolean {
    // only cache `todo` routes
    //   return req.url.includes('todos');
    // }




    // if (req.url.indexOf('/token')<0){
    //   const cacheResponse = this.cacheService[req.urlWithParams] || null;
    //   if (cacheResponse) {
    //     console.log('response from cache')
    //     return of(cacheResponse)
    //   }
    // }

    // return next.handle(req).pipe(
    //   tap(event => {
    //     if (event instanceof HttpResponse && req.urlWithParams.indexOf('/token')<0) {
    //       this.cacheService[req.urlWithParams] = event;
    //       console.log('response from server')
    //     }
    //   })
    // )





    // if (req.method !== 'GET') {
    //   return next.handle(req);
    // }
    // const cachedResponse = this.cache.get(req.url);
    // if (cachedResponse) {
    //   console.log('response from cache')
    //   return of(cachedResponse);
    // }
    // return next.handle(req).pipe(
    //   tap(event => {
    //     if (event instanceof HttpResponse) {
    //       this.cache.set(req.url, event);
    //       console.log('response from server')
    //     }
    //   })
    // );


  }

  private canCache(req: HttpRequest<any>) {
    // return (req.method === 'GET') && (req.url.indexOf('/token')<0);
    return req.url.indexOf('/token') < 0
  }
}

// canCache(req: HttpRequest<any>): boolean {
    // only cache `todo` routes
    //   return req.url.includes('todos');
    // }