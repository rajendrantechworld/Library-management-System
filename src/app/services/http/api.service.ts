import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';
import { Observable as __Observable, throwError, from } from 'rxjs';
import { map as __map, filter as __filter, catchError, retry } from 'rxjs/operators';
import { AuthenticationCheckService } from '../auth/authentication-check.service';
import { FormBuilder, FormGroup } from "@angular/forms";
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'X-Frame-Options': 'SAMEORIGIN'
    }),
  observe: 'response' as 'response'
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  authToken;
  program_id: any;
  $beatResonseData = new EventEmitter();
  $channelResonseData = new EventEmitter();
  $addEngageData = new EventEmitter();
  $target_frequencyData = new EventEmitter();

  constructor(private httpClient: HttpClient, protected config: ApiConfiguration, private auth: AuthenticationCheckService) {
    this.authToken = auth.getAuthToken();
  }


  // Get details from server
  public get(url: any): __Observable<[]> {
    let headers = { 'Content-Type': 'application/json' };
    return this.httpClient.get<any>(this.check_program_url(url), { responseType: 'json' })
      .pipe(
        catchError(this.handleError)
      )
  }

  public getHeaders(url: any): __Observable<any> {
    return this.httpClient.get<any>(this.check_program_url(url), { observe: 'response' });
  }

  public getFullResponse(url: any): __Observable<any> {
    return this.httpClient.get<any>(this.check_program_url(url), { observe: 'response' }).pipe(catchError(this.handleError))
  }

  // post details to server
  public post(url, data: any): __Observable<any> {
    let headers = { 'Content-Type': 'application/json' };
    return this.httpClient.post<any>(this.check_program_url(url, data), data, httpOptions).pipe(catchError(this.handleError))
  }

  // put details to server
  public put(url, data: any): __Observable<any> {
    let headers = { 'Content-Type': 'application/json' };
    return this.httpClient.put<any>(this.check_program_url(url, data), data, httpOptions).pipe(catchError(this.handleError))
  }

  // put details to server
  public delete(url, data: any): __Observable<any> {
    let headers = { 'Content-Type': 'application/json' };
    return this.httpClient.delete<any>(this.check_program_url(url, data), data).pipe(catchError(this.handleError))
  }

  public postFullResponse(url: any, data: any): __Observable<any> {
    let headers = { 'Content-Type': 'application/json' };
    return this.httpClient.post<any>(this.check_program_url(url, data), data, { headers, observe: 'response' }).pipe(catchError(this.handleError))
  }

  public postWithFormData(url, data: any): __Observable<any> {
    let headers = { 'Content-Type': 'application/json' };
    return this.httpClient.post<any>(this.check_program_url(url, data), data, { headers, responseType: 'json' }).pipe(catchError(this.handleError))
  }

  public postWithFormDataNew(url, data: any): __Observable<any> {
    let headers = { 'Content-Type': 'multipart/form-data' };
    return this.httpClient.post<any>(this.check_program_url(url, data), data, { headers }).pipe(catchError(this.handleError));
    //return this.httpClient.post(url, data).map((response: Response) => { return response; }).catch(this.handleError);
  }

  // Post with Progress report
  public upload(url, sendFile): __Observable<HttpEvent<any>> {
    //  {reportProgress: true,observe: 'events',responseType: 'json',headers:{skip:"true",'Content-type':'undefined'}}
    return this.httpClient.post<any>(this.check_program_url(url, sendFile), sendFile, { reportProgress: true, observe: 'events', headers: { skip: "true" } }).pipe(catchError(this.handleError))
  }

  public upload_with_loader(url, sendFile): __Observable<HttpEvent<any>> {
    //  {reportProgress: true,observe: 'events',responseType: 'json',headers:{skip:"true",'Content-type':'undefined'}}
    return this.httpClient.post<any>(this.check_program_url(url, sendFile), sendFile, { reportProgress: true, observe: 'events' }).pipe(catchError(this.handleError))
  }

  /**
   * 
   * @param url, data
   * @returns URL + program_id(dynamic)
   */
  check_program_url(url, data?) {
    // get program id for LS
    let programdetails: any;
    programdetails = JSON.parse(window.localStorage.getItem("program"));
    
    // If it is not the API that is used to change the program_id
    // if (url !== this.config.update_login_program && url !== this.config.login && url !== this.config.setupProgram) {
    //   // add program id if not exists
    //   // replace program_id if already exists and is wrong, reason: some places have hardcoded values
    //   try {
    //     let check_q_mark = url.indexOf('?');
    //     if (check_q_mark != -1) {
    //       let last_char = url.charAt(url.length - 1);
    //       let program = url.indexOf("program_id=1");
    //       if (program != -1) {
    //         url = url.replace("program_id=1", ("program_id=" + programdetails.program_id));
    //       } else {
    //         if (last_char != '/') {
    //           url += "&program_id=" + programdetails.program_id;
    //         }
    //         // 
    //       }
    //     } else {
    //       url += "?program_id=" + programdetails.program_id;
    //     }
    //   } catch (error) { }
    //   // if it is a post request, meaning if it has a body
    //   if (data) {
    //     // if it is login API [inbuild method for Yii] 
    //     //
    //     //
    //     if (url == this.config.login) {
          
    //       data = JSON.parse(data)
    //       data.LoginForm.program_id = programdetails.program_id
    //     } else {
    //       // every other post request
    //       data.program_id = programdetails.program_id
    //     }

    //   }
    // }
    return url;
  }
  // download file from server
  // public downloadFile(url,data:any):__Observable<any>{
  //   const headers = {
  //     headers : new HttpHeaders({'Content-Type': 'application/json'})
  //   }
  //   return this.httpClient.get<any>(url,{responseType: 'json'}).pipe(catchError(this.handleError))
  // }

  // Error handling
  private handleError(response: any) {
    return throwError(response.error);
  }
}
