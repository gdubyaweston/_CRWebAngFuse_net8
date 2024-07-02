import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { EnvironmentUrlService } from "./envurlinfo.service";
import { GlobalFunctionsService } from "./gfinfo.service";
import { TokenStorageService } from "./tsinfo.service";
import { EscrowParams } from "app/modules/_modules/escrowclasses";
import { Observable, switchMap, of } from "rxjs";
import { EscrowParticipant } from "app/modules/_modules/escrowclasses";
import { SearchParameters } from "app/modules/_modules/serviceclasses";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ParticipantInfoService {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    constructor(
        private _httpClient: HttpClient, 
        private _envUrl: EnvironmentUrlService,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _rtr: Router,
        private _ts: TokenStorageService,) 
    { 
        this._gfs.showLog('ParticipantInfoService', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    saveParticipant(eparams: EscrowParticipant): Observable<any> 
    {
        this._gfs.showLog('ParticipantInfoService', 'saveParticipant', 'eparams', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowdetails/submitescrowparticipant';
        this._gfs.showLog('ParticipantInfoService', 'saveParticipant', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('ParticipantInfoService', 'saveParticipant', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        );      

        
    }

    getParticipants(eparams: SearchParameters): Observable<any> 
    {
        this._gfs.showLog('ParticipantInfoService', 'getParticipants', 'eparams', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowdetails/participantsearch';
        this._gfs.showLog('ParticipantInfoService', 'getParticipants', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('ParticipantInfoService', 'getParticipants', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        ); 
        
    }

    getParticipantSearch(eparams: SearchParameters): Observable<any> 
    {
        //this._eos.getParticipantSearch("api/escrowdetails/getparticipant", par)
        this._gfs.showLog('ParticipantInfoService', 'getParticipantSearch', 'eparams', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowdetails/getparticipant';
        this._gfs.showLog('ParticipantInfoService', 'getParticipantSearch', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('ParticipantInfoService', 'getParticipantSearch', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        );
        
    }

    retrievePartipants(eparams: EscrowParams): Observable<any> {
        this._gfs.showLog('ParticipantInfoService', 'retrievePartipants', 'eparams:', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowdetails/getparticipants';
        this._gfs.showLog('ParticipantInfoService', 'retrievePartipants', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('ParticipantInfoService', 'retrievePartipants', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        );
    }

        

   

}