import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouteDataProvider } from './providers/RouteDataProvider.provider';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from '../services/auth/auth-guard.service';
import { AuthenticationCheckService } from '../services/auth/authentication-check.service';
// import { ToastService } from '../services/toast/toast.service';
 import { CKEditorModule } from 'ckeditor4-angular';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorBlockModule } from 'ngx-color/block';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { ImageViewerForEditorComponent } from './image-viewer-for-editor/image-viewer-for-editor.component';
import { AccordionConfig, AccordionModule } from "ngx-bootstrap/accordion";
import { ToastComponent } from './toast/toast.component';
import { CarouselConfig, CarouselModule } from "ngx-bootstrap/carousel";
import { TabsetConfig, TabsModule } from "ngx-bootstrap/tabs";

@NgModule({
  declarations: [
     ColorPaletteComponent,
    ImageViewerForEditorComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    NgxUiLoaderModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    TabsModule.forRoot(),
    ColorSketchModule,
    ColorBlockModule,
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
  
  ],
  exports: [
    NgbModule,
    HttpClientModule,
    NgxUiLoaderModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    ColorSketchModule,
    ColorBlockModule,
    AccordionModule,
    ToastComponent,
    TabsModule,
    CarouselModule,
    
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        RouteDataProvider,
        AuthGuardService,
        AuthenticationCheckService,
        // ToastService,
        DatePipe,
        TabsetConfig,
        { provide: AccordionConfig, useValue: { closeOthers: true } },
        {
          provide: CarouselConfig,
          useValue: { interval: 1500, noPause: true, showIndicators: true },
        },
      ]
    };
  }
}
