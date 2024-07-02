import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { EnvironmentUrlService } from "./envurlinfo.service";
import { GlobalFunctionsService } from "./gfinfo.service";
import { TokenStorageService } from "./tsinfo.service";
import { EscrowParams } from "app/modules/_modules/escrowclasses";
import { Observable, switchMap, of } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class EscrowOrderInfoService {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    constructor(
        private _httpClient: HttpClient, 
        private _envUrl: EnvironmentUrlService,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _rtr: Router,
        private _ts: TokenStorageService,) 
    { 
        this._gfs.showLog('EscrowOrderInfoService', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    getEscrowOrder(eparams: EscrowParams): Observable<any> 
    {
        this._gfs.showLog('EscrowOrderInfoService', 'getEscrowOrder', 'eparams', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowdetails/escroworderdetail';
        this._gfs.showLog('EscrowOrderInfoService', 'getEscrowOrder', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('EscrowOrderInfoService', 'getEscrowOrder', 'response:', response);
                
                // Return a new observable with the response
                return of(response);
            }),
        );       

        
    }

   demoEscrow(eparams: EscrowParams): Observable<any> 
    {
        this._gfs.showLog('EscrowOrderInfoService', 'demoEscrow', 'eparams', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/devescrow/duplicateescrow';
        this._gfs.showLog('EscrowOrderInfoService', 'demoEscrow', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('EscrowOrderInfoService', 'demoEscrow', 'response:', response);  
                
                // Return a new observable with the response
                return of(response);
            }),
        );
        

        //return null;
    }

    copyEscrow(eparams: EscrowParams): Observable<any> 
    {
        this._gfs.showLog('EscrowOrderInfoService', 'copyEscrow', 'eparams', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowcopy/copyescrow';
        this._gfs.showLog('EscrowOrderInfoService', 'copyEscrow', 'daUrl:', daUrl);

        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('EscrowOrderInfoService', 'copyEscrow', 'response:', response);
                
                // Return a new observable with the response
                return of(response);
            }),
        );
        

        //return null;
    }

    getEscrowRoleParticipants(): Observable<any> 
    {
        this._gfs.showLog('EscrowOrderInfoService', 'getEscrowRoleParticipants', '', null);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowdetails/escrowrolesparticipants';
        this._gfs.showLog('EscrowOrderInfoService', 'getEscrowRoleParticipants', 'daUrl:', daUrl);
        
        return this._httpClient.get(daUrl, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('EscrowOrderInfoService', 'getEscrowRoleParticipants', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        );      

        
    }

    getLinkedOrders(eparams: EscrowParams): Observable<any> 
    {
        this._gfs.showLog('EscrowOrderInfoService', 'getLinkedOrders', 'eparams:', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowdetails/getlinkedorders';
        this._gfs.showLog('EscrowOrderInfoService', 'getLinkedOrders', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('EscrowOrderInfoService', 'getLinkedOrders', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        );      

        
    }

    getCurrentDescription(eparams: EscrowParams): Observable<any> 
    {
        this._gfs.showLog('EscrowOrderInfoService', 'getCurrentDescription', 'eparams', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowdetails/getclosingdescription';
        this._gfs.showLog('EscrowOrderInfoService', 'getCurrentDescription', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('EscrowOrderInfoService', 'getCurrentDescription', 'response:', response);  
                
                // Return a new observable with the response
                return of(response);
            }),
        );
        

        //return null;
    }

    updateCurrentDescription(eparams: EscrowParams): Observable<any> 
    {
        this._gfs.showLog('EscrowOrderInfoService', 'updateCurrentDescription', 'eparams', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowdetails/updateclosingdescription';
        this._gfs.showLog('EscrowOrderInfoService', 'updateCurrentDescription', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('EscrowOrderInfoService', 'updateCurrentDescription', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        );
        

        //return null;
    }


}