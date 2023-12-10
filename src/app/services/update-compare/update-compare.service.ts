import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateCompareService {
  changedData:any
  objectKeys
  constructor() { }

  formatData(initialData, newData, model) {

    this.changedData = {}
    this.objectKeys = []
    
    for (var key in initialData) {
      this.objectKeys.push(JSON.parse(JSON.stringify(key)))
    }

    this.objectKeys.forEach(key => {
      if(initialData[key] !== newData[key]){
        this.changedData[`${model}[${key}]`] = newData[key] 
      }
      
    });

    return this.changedData

  }
}
