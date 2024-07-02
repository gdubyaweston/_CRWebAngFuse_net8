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
export class PDFInfoService {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    constructor(
        private _httpClient: HttpClient, 
        private _envUrl: EnvironmentUrlService,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _rtr: Router,
        private _ts: TokenStorageService,) 
    { 
        this._gfs.showLog('PDFInfoService', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    createBosPdf(eparams: EscrowParams): Observable<any> {
        this._gfs.showLog('PDFInfoService', 'createBosPdf', 'eparams:', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/pdf/createbos';
        this._gfs.showLog('PDFInfoService', 'createBosPdf', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('PDFInfoService', 'createBosPdf', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        );
    }

    createAraPdf(eparams: EscrowParams): Observable<any> {
        this._gfs.showLog('PDFInfoService', 'createAraPdf', 'eparams:', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/pdf/createara';
        this._gfs.showLog('PDFInfoService', 'createAraPdf', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('PDFInfoService', 'createAraPdf', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        );
    }

    createPoiPdf(eparams: EscrowParams): Observable<any> {
        this._gfs.showLog('PDFInfoService', 'createPoiPdf', 'eparams:', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/pdf/createpoi';
        this._gfs.showLog('PDFInfoService', 'createPoiPdf', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('PDFInfoService', 'createPoiPdf', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        );
    }

}
