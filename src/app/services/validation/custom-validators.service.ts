import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  specialCharValidator(control: FormControl): { [key: string]: boolean } {
    const charRegexp: RegExp = /[<>]/;
    if (control.value && charRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }

}
