import { Component } from '@angular/core';
import { UploadZipService } from './services/upload-zip/upload-zip.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isopenUploadBox = false;
  title = 'hubAdmin';
  uploadExcelDetails:any;
  loaderConfig = {
    "bgsColor": "rgba(52,51,51,0.19)",
    "bgsOpacity": 0.5,
    "bgsPosition": "bottom-right",
    "bgsSize": 60,
    "bgsType": "ball-scale-multiple",
    "blur": 5,
    "delay": 0,
    "fastFadeOut": true,
    "fgsColor": "#007bff",
    "fgsPosition": "bottom-right",
    "fgsSize": 60,
    "fgsType": "square-jelly-box",
    "gap": 24,
    "logoPosition": "center-center",
    "logoSize": 120,
    "logoUrl": "",
    "masterLoaderId": "master",
    "overlayBorderRadius": "0",
    "overlayColor": "rgba(40, 40, 40, 0.8)",
    "pbColor": "#007bff",
    "pbDirection": "ltr",
    "pbThickness": 3,
    "hasProgressBar": true,
    "text": "",
    "textColor": "#FFFFFF",
    "textPosition": "center-center",
    "maxTime": -1,
    "minTime": 300
  };
 

  constructor(private uploadService:UploadZipService,
    
    ) {
    this.uploadService.currentMessage.subscribe(message => {
      if(message.status != 'Initialized'){
        // 
        this.isopenUploadBox = true;
        this.uploadExcelDetails = message;
      }
      if(message.status == 'close'){
        this.isopenUploadBox = false;
      }
    })
   }
}
