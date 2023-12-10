import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileService } from 'src/app/services/file/file.service';
import { ApiConfiguration } from 'src/app/services/http/api-configuration';
import { ApiService } from 'src/app/services/http/api.service';
import { ToastClientService } from 'src/app/services/toast/toast-client.service';
import { UploadZipService } from 'src/app/services/upload-zip/upload-zip.service';

@Component({
  selector: 'app-upload-excel-details',
  templateUrl: './upload-excel-details.component.html',
  styleUrls: ['./upload-excel-details.component.scss']
})
export class UploadExcelDetailsComponent implements OnInit {
  /**
   * This this common module for all the components upload big file and while processing(uploading) user can go other componets.
   * For this module api loader disabled in interceptor by setting header skip=true.
   */
  minimiseClass: string = '';
  isminimise: boolean = false;
  progress: number = 0;
  @Input() data: any;
  fileSize: string;
  uploadFileSubscribe;
  apiCalled: any = { status: false, text: 'Uploading...' };
  uploadDetails: FileList;
  modalRef;
  uploadedStatus: any;
  ishaveFailedReport: any = {
    flag: false,
    url: ''
  }
  constructor(private uploadFile: UploadZipService, private modalService: NgbModal,
    private config: ApiConfiguration, private toast: ToastClientService,
    private apiService: ApiService, public fileService: FileService,) { }
  ngOnInit() {
    
  }
  minimiseDialogue() {
    if (this.isminimise) {
      this.minimiseClass = 'maximiseTheDIv'
    } else {
      this.minimiseClass = 'minimiseTheDIv'
    }
    this.isminimise = !this.isminimise;
    
  }
  uploadZipWithExcelFile(files: FileList) {
    this.uploadDetails = files;
    this.fileSize = (files[0].size / 1024 / 1024).toFixed(2) + ' MB';
    
  }
  uploadToServer(files: FileList) {
    this.apiCalled.status = true;
    let sendDetails: any = [];
    if (!this.data.isZip) {
      sendDetails = [
        {
          name: "excel_data",
          // name:"target_points",
          file: this.data.data,
          fileType: 1
        }
      ]
      if (this.data.module == "targets") {
        sendDetails.push({ name: 'target_id', file: this.data.targetid });
      }
    } else {
      sendDetails = [
        {
          name: "products",
          file: JSON.stringify(this.data.data),
          fileType: 1
        }, {
          name: "zip_file",
          file: this.uploadDetails[0],
          fileType: 2
        }
      ]
    }

    var formData: any = new FormData();
    let localData = localStorage.getItem('program')
    let localJSON = JSON.parse(localData)
    formData.append("program_id", localJSON.program_id);
    if (sendDetails) {
      sendDetails.forEach(element => {
        formData.append(element.name, element.file);
      });
    } else {
      this.toast.Warning("Can not process this request!");
      return
    }

    this.uploadFileSubscribe = this.apiService.upload(this.data.url, formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = this.fileService.calcProgressPercent(event);
      } else if (event instanceof HttpResponse) {
        if (event.body.data) {
          this.uploadedStatus = event.body.data;
          try {
            var key = Object.keys(this.uploadedStatus).filter((key) => key === "excel_download_path")[0];
            if (key) {
              this.ishaveFailedReport.flag = true;
              this.ishaveFailedReport.url = this.uploadedStatus[key];
            }
            
          } catch (error) {

          }
          if(event.body.data.product_generated >0){
            this.toast.Success("Record Inserted Successfully !!");
          }else{
            this.toast.Error("Failed to insert data");
          }
          this.uploadFile.changeMessage({ status: 'success', response: this.uploadedStatus });
        }
        this.apiCalled.text = "Uploaded";
      }
    }, err => {
      
      this.apiCalled.text = "Failed!";
      this.toast.Error("Record Inserted Failed !!");
    });
  }
  public cancelUpload() {
    this.uploadFileSubscribe.unsubscribe();
    this.apiCalled.status = false;
    this.uploadDetails = null;
    this.fileSize = null;
    this.modalRef.dismiss();
    this.uploadFile.changeMessage({ status: 'close' });
  }
  closePanel(target) {
    this.modalRef = this.modalService.open(target, {
      centered: true,
      size: 'sm',
      scrollable: true,
    });
  }
  downloadRejectedReport() {
    window.open(this.ishaveFailedReport.url, "_blank");
  }
  closeUploadDialogue(target) {
    this.ishaveFailedReport = {
      flag: false,
      url: ''
    };
    if (this.fileSize && this.apiCalled.status) {
      if (this.apiCalled.text == "Uploaded") {
        this.uploadFile.changeMessage({ status: 'close' });
      } else {
        this.closePanel(target);
      }
    } else {
      this.uploadFile.changeMessage({ status: 'close' });
    }
  }
}
