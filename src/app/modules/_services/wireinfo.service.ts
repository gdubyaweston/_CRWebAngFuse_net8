import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { Observable, of, switchMap } from "rxjs";
import { GlobalFunctionsService } from "./gfinfo.service";
import { EnvironmentUrlService } from "./envurlinfo.service";
import { TokenStorageService } from "./tsinfo.service";
import { WiringInformation } from "app/modules/_modules/wiringclasses";
import { EscrowParams } from "app/modules/_modules/escrowclasses";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class WiringService {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    constructor(
        private _httpClient: HttpClient, 
        private _envUrl: EnvironmentUrlService,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _rtr: Router,
        private _ts: TokenStorageService,) 
    { 
        this._gfs.showLog('WiringService', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
   

    saveWiringInformation(wparams: WiringInformation): Observable<any>{
        // api/aircraftinventory/getavailableobjecttypes
        this._gfs.showLog('WiringService', 'saveWiringInformation', 'wparams:', wparams);
        
        //api/wiring/addwireinformation
        var daUrl = this._envUrl.urlAddress + '/api/wiring/addwireinformation';
        this._gfs.showLog('WiringService', 'saveWiringInformation', 'daUrl:', daUrl);
                
        return this._httpClient.post(daUrl, wparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('WiringService', 'saveWiringInformation', 'response:', response);
                                
                // Return a new observable with the response
                return of(response);
            }),
        )

    }

    getWiringList(wparams: EscrowParams): Observable<any>{
        // api/aircraftinventory/getavailableobjecttypes
        this._gfs.showLog('WiringService', 'getWiringList', 'wparams:', wparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/wiring/getwirelist';
        this._gfs.showLog('WiringService', 'getWiringList', 'daUrl:', daUrl);
                
        return this._httpClient.post(daUrl, wparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('WiringService', 'getWiringList', 'response:', response);
                                
                // Return a new observable with the response
                return of(response);
            }),
        )

    }
   
    

}
