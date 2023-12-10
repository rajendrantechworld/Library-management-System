import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { map, catchError, retryWhen, delay, take, tap, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthenticationCheckService } from '../auth/authentication-check.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastClientService } from '../toast/toast-client.service';
import { Router } from '@angular/router';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  /**
  * Whenever calling Api this interceptor will inject AUTH_Token and enable loader
  */
  constructor(private auth: AuthenticationCheckService, private ngxService: NgxUiLoaderService, private toast: ToastClientService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
    //Authentication by setting header with token value
    let disableloader = request.headers.get("skip");
    let token = this.auth.getAuthToken();
    // 
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': token
        }
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          // 'content-type': 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    if (disableloader != 'true') {
      this.loaderStart();
    }
    return next.handle(request).pipe(
      // retryWhen(err=>{
      //     let retries =1;
      //     return err.pipe(
      //         delay(1000),
      //         tap(()=>{
      //             
      //         }),
      //         map(error=>{
      //             if(retries++ === 3){
      //                 return error
      //             }
      //             return error
      //         })
      //     )
      // }),
      
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        let toasterMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
          toasterMessage = error.error.message;
        } else {
          // server-side error
          toasterMessage = error.error.data.message;
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

        }
        this.toast.Error(toasterMessage.split('"').join(''));
        try {
          if (toasterMessage.toLowerCase().split('"').join('') == 'no access to this module' ||
            toasterMessage.toLowerCase().split('"').join('') == 'unauthorized user access!!' ||
            toasterMessage.toLowerCase().split('"').join('') == 'access token is not set permission denied!' ||
            toasterMessage.toLowerCase().split('"').join('') == 'something wrong with request.'
          ) {

            setTimeout(() => {
              this.auth.logout();
              this.router.navigateByUrl('/signin', { replaceUrl: true });
            }, 500);
          }
          //
        } catch (error) {
        }
        this.loaderDismiss();
        return throwError(errorMessage);
      }),
      finalize(() => {
        this.loaderDismiss();
      })
    );
  }
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
    } catch (error) {

    }
  }
}
