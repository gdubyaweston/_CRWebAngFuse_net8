import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { CustomerParams } from "app/modules/_modules/customerclasses";
import { Observable, switchMap, of } from "rxjs";
import { EnvironmentUrlService } from "./envurlinfo.service";
import { GlobalFunctionsService } from "./gfinfo.service";
import { TokenStorageService } from "./tsinfo.service";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    
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
        this._gfs.showLog('EscrowListService', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
   

    getCustomerList(eparams: CustomerParams): Observable<any> 
    {
        console.log('[CustomerService - getCustomerList]');
        console.log(eparams);

        console.log('[CustomerService - getCustomerList] Call Post:');

        var daUrl = this._envUrl.urlAddress + '/api/customer/getcustomers';
        console.log(daUrl);
       

        return this._httpClient.post(daUrl, eparams, httpOptions).pipe(
            switchMap((response: any) =>
            {
                console.log('[CustomerService - getCustomerList] response:');
                console.log(response);  
                
                // Return a new observable with the response
                return of(response);
            }),
        );
        
    }
    

}
