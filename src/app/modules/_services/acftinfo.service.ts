import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { EscrowParams } from "app/modules/_modules/escrowclasses";
import { Observable, switchMap, of } from "rxjs";
import { EnvironmentUrlService } from "./envurlinfo.service";
import { GlobalFunctionsService } from "./gfinfo.service";
import { TokenStorageService } from "./tsinfo.service";
import { AircraftInventoryItem } from "../_modules/aircraftclasses";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AircraftService {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    constructor(
        private _httpClient: HttpClient, 
        private _envUrl: EnvironmentUrlService,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _rtr: Router,
        private _ts: TokenStorageService,
    ) 
    {
        this._gfs.showLog('AircraftService', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

   

    searchAvailableObjectTypes(aiparams: AircraftInventoryItem): Observable<any>{
        // api/aircraftinventory/getavailableobjecttypes
        this._gfs.showLog('AircraftService', 'searchAvailableObjectTypes', 'aiparams:', aiparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/aircraftinventory/getavailableobjecttypes';
        this._gfs.showLog('AircraftService', 'searchAvailableObjectTypes', 'daUrl:', daUrl);
                
        return this._httpClient.post(daUrl, aiparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('AircraftService', 'searchAvailableObjectTypes', 'response:', response);
                                
                // Return a new observable with the response
                return of(response);
            }),
        )

    }

    searchAssignedInventory(aiparams: AircraftInventoryItem): Observable<any>{
        this._gfs.showLog('AircraftService', 'searchAssignedInventory', 'aiparams:', aiparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/aircraftinventory/getassignedinventory';
        this._gfs.showLog('AircraftService', 'searchAssignedInventory', 'daUrl:', daUrl);
                
        return this._httpClient.post(daUrl, aiparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('AircraftService', 'searchAssignedInventory', 'response:', response);
                
                // Return a new observable with the response
                return of(response);
            }),
        )
        
    }
    
    searchAircraftInventory(aiparams: AircraftInventoryItem): Observable<any>{
        this._gfs.showLog('AircraftService', 'searchAircraftInventory', 'aiparams:', aiparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/aircraftinventory/getaircraftinventory';
        this._gfs.showLog('AircraftService', 'searchAircraftInventory', 'daUrl:', daUrl);
                
        return this._httpClient.post(daUrl, aiparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('AircraftService', 'searchAircraftInventory', 'response:', response);  
                
                // Return a new observable with the response
                return of(response);
            }),
        )
        
    }
    
    submitAircraftInventory(aiparams: AircraftInventoryItem): Observable<any>{
        this._gfs.showLog('AircraftService', 'submitAircraftInventory', 'aiparams:', aiparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/aircraftinventory/saveaircraftinventory';
        this._gfs.showLog('AircraftService', 'submitAircraftInventory', 'daUrl:', daUrl);
                
        return this._httpClient.post(daUrl, aiparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('AircraftService', 'submitAircraftInventory', 'response:', response);
                
                // Return a new observable with the response
                return of(response);
            }),
        )
        
    }
    
    submitNewAircraftInventory(aiparams: AircraftInventoryItem): Observable<any>{
        this._gfs.showLog('AircraftService', 'submitNewAircraftInventory', 'aiparams:', aiparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/aircraftinventory/savenewaircraftinventory';
        this._gfs.showLog('AircraftService', 'submitNewAircraftInventory', 'daUrl:', daUrl);
                
        return this._httpClient.post(daUrl, aiparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('AircraftService', 'submitNewAircraftInventory', 'response:', response);  
                
                // Return a new observable with the response
                return of(response);
            }),
        )
        
    }
    

}
