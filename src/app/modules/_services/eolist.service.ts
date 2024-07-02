import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EnvironmentUrlService } from "./envurlinfo.service";
import { GlobalFunctionsService } from "./gfinfo.service";
import { EscrowListSearch } from "app/modules/_modules/escrowclasses";
import { Observable, switchMap, of } from "rxjs";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class EscrowOrderListService {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    constructor(
        private _httpClient: HttpClient, 
        private _envUrl: EnvironmentUrlService,
        ) 
    { 
        this._gfs.showLog('EscrowOrderListService', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    getEscrowOrderList(eparams: EscrowListSearch): Observable<any> 
    {
        this._gfs.showLog('EscrowOrderListService', 'getEscrowOrderList', '', null);
        this._gfs.showLog('EscrowOrderListService', 'getEscrowOrderList', 'eparams', eparams);

        var daUrl = this._envUrl.urlAddress + '/api/escrowlist/multiple';
        this._gfs.showLog('EscrowOrderListService', 'getEscrowOrderList', 'daUrl', daUrl);
              

        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                this._gfs.showLog('EscrowOrderListService', 'getEscrowOrderList', 'response', response);
                                
                // Return a new observable with the response
                return of(response);
            }),
        );
        
    }

}