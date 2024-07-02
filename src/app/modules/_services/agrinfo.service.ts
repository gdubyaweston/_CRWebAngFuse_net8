import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { EscrowParams } from "app/modules/_modules/escrowclasses";
import { Observable, switchMap, of } from "rxjs";
import { EnvironmentUrlService } from "./envurlinfo.service";
import { GlobalFunctionsService } from './gfinfo.service';
import { TokenStorageService } from "./tsinfo.service";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AgreementService {

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
        this._gfs.showLog('AgreementService', 'constructor', '', null);
        this._gfs.allowCall = false;     
    }
       

    getAgreementInfo(eparams: EscrowParams): Observable<any> 
    {
        this._gfs.showLog('AgreementService', 'getAgreementInfo', 'eparams:', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/agreement/getagreementinfo';
        this._gfs.showLog('AgreementService', 'getAgreementInfo', 'daUrl:', daUrl);
        
        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('AgreementService', 'getAgreementInfo', 'response:', response);
                
                // Return a new observable with the response
                return of(response);
            }),
        );
        

        //return null;
    }


}
