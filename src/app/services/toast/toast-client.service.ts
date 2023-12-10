import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ToastClientService {
  /**
   * Common toaster service for components
   */
  constructor(public toastService: ToastService) { }

  Success(message) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 10000 ,
      autohide: true,
      headertext: 'Success!'
    });
  }
  Error(message) {
    this.toastService.show(message, {
      classname: 'bg-danger text-light',
      delay: 10000 ,
      autohide: true,
      headertext: 'Error!'
    });
  }
  Warning(message) {
    this.toastService.show(message, {
      classname: 'bg-warning text-light',
      delay: 6000 ,
      autohide: true,
      headertext: 'Warning!'
    });
  }
  info(message) {
    this.toastService.show(message, {
      delay: 6000,
      autohide: true
    });
  }
}
