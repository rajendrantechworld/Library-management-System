import { HttpProgressEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  /**
   * To calculate uploading file to server progress
   */
  constructor() { }
  calcProgressPercent(event: HttpProgressEvent){
    return Math.round(100 * event.loaded / event.total);
  }
}
