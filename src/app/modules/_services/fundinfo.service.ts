import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { EscrowParams } from "app/modules/_modules/escrowclasses";
import { FundingInformation } from "app/modules/_modules/fundingclass";
import { Observable, switchMap, of } from "rxjs";
import { EnvironmentUrlService } from "./envurlinfo.service";
import { GlobalFunctionsService } from "./gfinfo.service";
import { TokenStorageService } from "./tsinfo.service";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class FundingService {
    
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
        this._gfs.showLog('FundingService', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
   

    saveInitialFunding(finfo: FundingInformation): Observable<any> {
        this._gfs.showLog('FundingService', 'saveInitialFunds', '', null);

        var daUrl = this._envUrl.urlAddress + '/api/funding/submitinitialfunding';
        this._gfs.showLog('FundingService', 'saveInitialFunds', 'daUrl:', daUrl);

        return this._httpClient.post(daUrl, finfo, httpOptions).pipe(
            switchMap((response: any) => {
                this._gfs.showLog('FundingService', 'saveInitialFunds', 'response:', response);

                // Return a new observable with the response
                return of(response);
            })
        );

        //return null;
    }

    getInitialFundingInformation(eparams: EscrowParams): Observable<any> {
        this._gfs.showLog('FundingService', 'getInitialFundingInformation', 'eparams:', eparams);

        var daUrl = this._envUrl.urlAddress + '/api/funding/getinitialfundinginfo';
        this._gfs.showLog('FundingService', 'getInitialFundingInformation', 'daUrl:', daUrl);

        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) => {
                this._gfs.showLog('FundingService', 'getInitialFundingInformation', 'response:', response);

                // Return a new observable with the response
                return of(response);
            })
        );

        //return null;
    }

    deleteInitialFunding(eparams: EscrowParams): Observable<any> {
        this._gfs.showLog('FundingService', 'deleteInitialFunding', 'eparams:', eparams);

        var daUrl = this._envUrl.urlAddress + '/api/funding/deleteinitialfunding';
        this._gfs.showLog('FundingService', 'deleteInitialFunding', 'daUrl:', daUrl);

        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) => {
                this._gfs.showLog('FundingService', 'deleteInitialFunding', 'response:', response);

                // Return a new observable with the response
                return of(response);
            })
        );

        //return null;
    }

    getClosingList(eparams: EscrowParams): Observable<any> {
        this._gfs.showLog('FundingService', 'getClosingList', 'eparams:', eparams);

        var daUrl = this._envUrl.urlAddress + '/api/funding/getclosinglist';
        this._gfs.showLog('FundingService', 'getClosingList', 'daUrl:', daUrl);

        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) => {
                this._gfs.showLog('FundingService', 'getClosingList', 'response:', response);

                // Return a new observable with the response
                return of(response);
            })
        );

        //return null;
    }

    getAccountingList(eparams: EscrowParams): Observable<any> {
        this._gfs.showLog('FundingService', 'getAccountingList', 'eparams:', eparams);

        var daUrl = this._envUrl.urlAddress + '/api/funding/getaccountinglist';
        this._gfs.showLog('FundingService', 'getAccountingList', 'daUrl:', daUrl);

        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) => {
                this._gfs.showLog('FundingService', 'getAccountingList', 'response:', response);

                // Return a new observable with the response
                return of(response);
            })
        );

        //return null;
    }

    getInitialFundingList(eparams: EscrowParams): Observable<any> {
        this._gfs.showLog('FundingService', 'getInitialFundingList', 'eparams:', eparams);

        var daUrl = this._envUrl.urlAddress + '/api/funding/getinitialfundlist';
        this._gfs.showLog('FundingService', 'getInitialFundingList', 'daUrl:', daUrl);

        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) => {
                this._gfs.showLog('FundingService', 'getInitialFundingList', 'response:', response);

                // Return a new observable with the response
                return of(response);
            })
        );

        //return null;
    }

    
}
