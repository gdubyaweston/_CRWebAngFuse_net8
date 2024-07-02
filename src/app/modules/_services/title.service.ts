import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { EnvironmentUrlService } from "./envurlinfo.service";
import { GlobalFunctionsService } from "./gfinfo.service";
import { TokenStorageService } from "./tsinfo.service";
import { Observable, switchMap, of } from "rxjs";
import { EscrowParams } from "app/modules/_modules/escrowclasses";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class TitleInfoService {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    constructor(
        private _httpClient: HttpClient, 
        private _envUrl: EnvironmentUrlService,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _rtr: Router,
        private _ts: TokenStorageService,) 
    { 
        this._gfs.showLog('TitleInfoService', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    saveTitleSearch(eparams: EscrowParams): Observable<any> 
    {
        this._gfs.showLog('TitleInfoService', 'saveTitleSearch', 'eparams', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowdetails/submitnewtitlesearch';
        this._gfs.showLog('TitleInfoService', 'saveTitleSearch', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('TitleInfoService', 'saveTitleSearch', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        );
        

        //return null;
    }

    saveTSAR(eparams: EscrowParams): Observable<any> 
    {
        this._gfs.showLog('TitleInfoService', 'saveTSAR', 'eparams', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowdetails/submittsar';
        this._gfs.showLog('TitleInfoService', 'saveTSAR', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('TitleInfoService', 'saveTSAR', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        );      

        
    }

}
