import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Observable as __Observable, throwError, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XlsxService {
  /**
  * Service for read and get data as JSON from EXCEL file.
  */
  constructor() { }
  async uploadXlsx(event: any) {
    let workBook = null;
    let jsonData: any = null;
    return new Promise(async (resolve) => {
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(event.target);
      if (target.files.length !== 1) {
        throw new Error('Cannot use multiple files');
      }
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(target.files[0]);
      let xlsxData: any;
      reader.onload = (e: any) => {
        /* create workbook */
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        /* save data */
        const data: any = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      
        const sdata = reader.result;
        workBook = XLSX.read(sdata, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, dateNF: 'yyyy-mm-dd' });
          return initial;
        }, {});
        const dataString = (jsonData);
        let key = Object.keys(dataString);
        let key1 = key[0];
        let excelData = dataString[key1];
        let headerArray = excelData[0];
        // 
        let count = 1;
        let converted: any = [];
        for (let i = 1; i < excelData.length; i++) {
          let subJson = excelData[i];
          let rowData: any = {};
          for (let j = 0; j < subJson.length; j++) {
            rowData[headerArray[j]] = subJson[j];
            if (typeof rowData[headerArray[j]] == undefined || typeof rowData[headerArray[j]] == 'undefined') {
              rowData[headerArray[j]] = '';
            }

            rowData.isEdit = false;

            try {
              if (headerArray[j].toLowerCase() == "s.no."
                || headerArray[j].toLowerCase() == "s.no"
                || headerArray[j].toLowerCase() == "no"
                || headerArray[j].toLowerCase() == "no.") {
                delete rowData[headerArray[j]];
              }
            } catch (error) {
            }

          }
          converted.push(rowData);
          count++;
        }
        // 
        headerArray.forEach((element, i) => {
          try {
            if (element.toLowerCase() == "s.no."
              || element.toLowerCase() == "s.no"
              || element.toLowerCase() == "no"
              || element.toLowerCase() == "no.") {
              headerArray.splice(i, 1);
            }
          } catch (error) {
          }
        });
        let extractedData = {
          headers: headerArray,
          data: converted
        }
        resolve(extractedData); // Data will be logged in array format containing objects
      };
    })
  }
  async export(data, name) {
    return new Promise((res, rej) => {
      let WS = XLSX.utils.json_to_sheet(data)
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, WS, name);
      XLSX.writeFile(wb, name + '.xlsx')
      res(WS)
    })
  }
}
