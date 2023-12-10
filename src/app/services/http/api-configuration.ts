/* tslint:disable */
import { Injectable } from "@angular/core";

/**
 * Global configuration for Api services
//  */
@Injectable({
  providedIn: "root",
})
export class ApiConfiguration {

  //Local
  baseUrl2 = ''


  login = this.baseUrl2 + "";

}
export interface ApiConfigurationInterface { }