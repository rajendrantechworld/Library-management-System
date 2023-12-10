import { BrowserModule } from "@angular/platform-browser";
import { Injector, NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
// import { SigninComponent } from "./signin/signin.component";
import {
  HttpClientModule,
  HttpXhrBackend,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { HttpConfigInterceptor } from "./services/interceptor/http-loading-interceptor";
 import { SharedModule } from "./shared/shared.module";
import { Router } from "@angular/router";
import { ToastService } from "./services/toast/toast.service";
import { DatePipe } from "@angular/common";
// import { UploadExcelDetailsComponent } from "./shared/upload-excel-details/upload-excel-details.component";
import { UploadZipService } from "./services/upload-zip/upload-zip.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from "./app.component";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
    // UploadExcelDetailsComponent,
   

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ModalModule,
    SharedModule
],
  providers: [
    ToastService,
    DatePipe,
     UploadZipService,
    { provide: HttpClientModule, deps: [HttpXhrBackend, Router, Injector] },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  
  ],
   bootstrap: [AppComponent],
})
export class AppModule { }
