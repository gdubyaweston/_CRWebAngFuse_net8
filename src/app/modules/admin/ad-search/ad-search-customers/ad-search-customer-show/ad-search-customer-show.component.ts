import { NgIf, CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { CustomerInfo } from 'app/modules/_modules/customerclasses';
import { CustomerService } from 'app/modules/_services/custinfo.service';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';
import { MiscService } from 'app/modules/_services/miscinfo.service';
import { TokenStorageService } from 'app/modules/_services/tsinfo.service';

@Component({
    selector     : 'ad-search-customer-show',
    standalone   : true,
    templateUrl  : './ad-search-customer-show.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [NgIf, CommonModule, FormsModule, MatTooltipModule],
})
export class ADSearchCustomerShowComponent
{
    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    customerData: CustomerInfo = new CustomerInfo();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _ms: MiscService,
        private _cs: CustomerService,
        private _dialog: MatDialog,
    )
    {
        this._gfs.showLog('ADSearchCustomerShowComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('ADSearchCustomerShowComponent', 'ngAfterViewInit', '', null);
        
    }

    ngOnInit(): void {
        this._gfs.showLog('ADSearchCustomerShowComponent', 'ngOnInit', '', null);    
       
        
    }

    ngOnDestroy(): void {
        this._gfs.showLog('ADSearchCustomerShowComponent', 'ngOnDestroy', '', null);
    }

    setData(customerData: CustomerInfo): void {
        this.customerData = customerData;
    }

    closeDialog(): void {
        this._gfs.showLog('ADSearchCustomerShowComponent', 'closeDialog', '', null);
        this._dialog.closeAll();
    }
    

}