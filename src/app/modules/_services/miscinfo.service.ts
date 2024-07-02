import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { Observable, of, switchMap } from 'rxjs';
import { GlobalFunctionsService } from './gfinfo.service';
import { EnvironmentUrlService } from './envurlinfo.service';
import { TokenStorageService } from './tsinfo.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
})
export class MiscService {
    
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
        this._gfs.showLog('MiscService', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    

    /*
    
    [HttpGet("getescrowuserlist")]
public async Task<ServiceResponse<List<IntListItem>>> GetEscrowUserList()

{
    return await RetrieveEscrowUserList();

}

[HttpGet("getescrowordertypelist")]
public async Task<ServiceResponse<List<IntListItem>>> GetEscrowOrderTypeList()
{
    return await RetrieveEscrowOrderTypeList();

}
    
    */

    getEscrowUserList(): Observable<any> 
    { 
        this._gfs.showLog('MiscService', 'getEscrowUserList', '', null);

        var daUrl = this._envUrl.urlAddress + '/api/misc/getescrowuserlist';
        this._gfs.showLog(
            'MiscService',
            'getEscrowUserList',
            'daUrl:',
            daUrl
        );

        return this._httpClient.get(daUrl, httpOptions).pipe(
            switchMap((response: any) => {
                this._gfs.showLog(
                    'MiscService',
                    'getEscrowUserList',
                    'response:',
                    response
                );

                // Return a new observable with the response
                return of(response);
            })
        );

        //return null;  
    }

    getEscrowOrderStatusTypeList(): Observable<any> 
    { 
        this._gfs.showLog('MiscService', 'getEscrowOrderStatusTypeList', '', null);

        var daUrl = this._envUrl.urlAddress + '/api/misc/getescroworderstatustypelist';
        this._gfs.showLog(
            'MiscService',
            'getEscrowOrderStatusTypeList',
            'daUrl:',
            daUrl
        );

        return this._httpClient.get(daUrl, httpOptions).pipe(
            switchMap((response: any) => {
                this._gfs.showLog(
                    'MiscService',
                    'getEscrowOrderStatusTypeList',
                    'response:',
                    response
                );

                // Return a new observable with the response
                return of(response);
            })
        );

        //return null; 
    }
   

    getCurrencyCodes(): Observable<any> {
        this._gfs.showLog('MiscService', 'getCurrencyCodes', '', null);

        var daUrl = this._envUrl.urlAddress + '/api/misc/getcurrencycodes';
        this._gfs.showLog(
            'MiscService',
            'getCurrencyCodes',
            'daUrl:',
            daUrl
        );

        return this._httpClient.get(daUrl, httpOptions).pipe(
            switchMap((response: any) => {
                this._gfs.showLog(
                    'MiscService',
                    'getCurrencyCodes',
                    'response:',
                    response
                );

                // Return a new observable with the response
                return of(response);
            })
        );

        //return null;
    }

    getCountries(): Observable<any> 
    {
        this._gfs.showLog('MiscService', 'getCountries', '', null);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowdetails/countries';
        this._gfs.showLog('MiscService', 'getCountries', 'daUrl:', daUrl);
        
        return this._httpClient.get(daUrl, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('MiscService', 'getCountries', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        );      

        
    }

    getUSStates(): Observable<any> 
    {
        this._gfs.showLog('MiscService', 'getUSStates', '', null);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowdetails/usstates';
        this._gfs.showLog('MiscService', 'getUSStates', 'daUrl:', daUrl);
        
        return this._httpClient.get(daUrl, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('MiscService', 'getUSStates', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        );      

        
    }

    getCanadianStates(): Observable<any> 
    {
        this._gfs.showLog('MiscService', 'getCanadianStates', '', null);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowdetails/canadianstates';
        this._gfs.showLog('MiscService', 'getCanadianStates', 'daUrl:', daUrl);
        
        return this._httpClient.get(daUrl, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('MiscService', 'getCanadianStates', 'response:', response);    
                
                // Return a new observable with the response
                return of(response);
            }),
        );      

        
    }

    /*
    getCurrencyCodes(route: string): Observable<ServiceResponse<StringListItem[]>> {
      return this.http.get<ServiceResponse<StringListItem[]>>(this.createRoute(route, this.envURL.urlAddress));
    }
    */
}
