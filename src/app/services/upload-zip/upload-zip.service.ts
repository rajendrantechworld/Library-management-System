import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UploadZipService {
  /**
   * intermediator to enable event emitor between components for upload zipFile
   */
  private messageSource = new BehaviorSubject({status:'Initialized'});
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message) {
    this.messageSource.next(message)
  }

}
