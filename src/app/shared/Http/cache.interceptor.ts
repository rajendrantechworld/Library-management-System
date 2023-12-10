import { Injectable, Inject, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { HttpCacheService } from "./HttpCacheService";
// import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(
    private cacheService: HttpCacheService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {}

  loaderStart() {
    try {
      this.ngxService.start();
    } catch (error) {
      
    }
  }
  loaderDismiss() {
    try {
      // this.loadingCntr.dismiss();
      this.ngxService.stop();
    } catch (error) {}
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // pass along non-cacheable requests and invalidate cache
    if (req.method !== "GET") {
      // 
      this.cacheService.invalidateCache();

      return next.handle(req);
    }

    // attempt to retrieve a cached response
    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

    // return cached response
    if (cachedResponse) {
      // 
      // 
      return of(cachedResponse);
    }
    // send request to server and add response to cache
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // 
          this.loaderStart();
          this.cacheService.put(req.url, event);
          this.loaderDismiss();
        }
      }),
      catchError((err: any) => {
        // 
        if (err instanceof HttpErrorResponse) {
          this.loaderDismiss();
          switch (err.status) {
            case 401:
            case 403:
              // this.toasterService.error("Un-Authorized Request", "Error", {
              //   timeOut: 10000,
              // });
              this.router.navigate(["/"]);
              break;
            case 404:
              // this.toasterService.error(err.message, "Error", {
              //   timeOut: 10000,
              // });
              break;
            case 500:
              // this.toasterService.error("Internal Server Error", "Error", {
              //   timeOut: 10000,

              // });
              // this.router.navigate(['/']);
              break;
              // this.router.navigate(['/']);
              break;
          }
        }
        return of(err);
      })
    );
  }
}
