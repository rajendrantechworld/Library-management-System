import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormateService {

  constructor(private datePipe: DatePipe) { }

  yearMonthDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  formateDate(data){
    return this.yearMonthDate(new Date(data.year, data.month -1, data.day));
  }
}
