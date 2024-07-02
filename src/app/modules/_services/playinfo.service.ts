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
export class PlayerInfoService {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    constructor(
        private _httpClient: HttpClient, 
        private _envUrl: EnvironmentUrlService,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _rtr: Router,
        private _ts: TokenStorageService,) 
    { 
        this._gfs.showLog('PlayerInfoService', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    getPlayers(eparams: EscrowParams): Observable<any> 
    {
        this._gfs.showLog('PlayerInfoService', 'getPlayers', 'eparams', eparams);
        
        var daUrl = this._envUrl.urlAddress + '/api/escrowcopy/getplayers';
        this._gfs.showLog('PlayerInfoService', 'getPlayers', 'daUrl:', daUrl);

        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('PlayerInfoService', 'getPlayers', 'response:', response); 
                
                // Return a new observable with the response
                return of(response);
            }),
        );
        

        //return null;
    }

    

   

}