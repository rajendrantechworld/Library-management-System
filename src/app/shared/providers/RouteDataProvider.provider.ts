import { Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute , Event , NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()

export class RouteDataProvider {
    area: BehaviorSubject<string> = new BehaviorSubject("");
    subArea: BehaviorSubject<string> = new BehaviorSubject("");
    queryParam: BehaviorSubject<any>  = new BehaviorSubject({});
    private _subAreaListners = new Subject<any>();
    private _programListners = new Subject<any>();
    public share = this.subArea.asObservable();
    constructor(private router: Router, private activateRoute: ActivatedRoute) {
        this.router.events.subscribe(
            data => {
                if(data instanceof NavigationEnd){
                    let urlParts:string[] = data.urlAfterRedirects.split("?");
                    let url: string = urlParts[0] || "";
                    let query:string = urlParts[1] || "";
                    if(url.length > 0){
                        let parts:string[] = url.split("/");
                        parts.splice(0,1);
                        let oldArea = this.area.getValue();
                        let newArea = parts[0] || "";
                        if(newArea !== oldArea){
                            this.area.next(newArea);
                        }

                        let oldSubArea = this.subArea.getValue();
                        let newSubArea = parts[1] || "";
                        if(newSubArea !== oldSubArea){
                            this.subArea.next(newSubArea);
                        }

                        if(parts[2] && parts[2].length > 0){//Handle landing page request, convert to query params
                            query = "id=" + parts[2];
                        }
                    }

                    if(query.length > 0){
                        this.queryParam.next(this.queryStringToJSON(query));
                    }else{
                        this.queryParam.next({});
                    }

                    // 
                }
            }
        )
    }

    private queryStringToJSON(queryString) {
        var pairs = queryString.split('&');
        var result = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return result;
    }

    subAreaListen(): Observable<any> {
        return this._subAreaListners.asObservable();
    }

    programListen(): Observable<any> {
        return this._programListners.asObservable();
    }
}
