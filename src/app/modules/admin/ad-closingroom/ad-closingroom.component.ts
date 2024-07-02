import { NgIf, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { LoginUser } from 'app/modules/_modules/loginclasses';
import { EscrowOrderListService } from 'app/modules/_services/eolist.service';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';
import { TokenStorageService } from 'app/modules/_services/tsinfo.service';

@Component({
    selector     : 'ad-closingroom',
    standalone   : true,
    templateUrl  : './ad-closingroom.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [NgIf, CommonModule, FormsModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTooltipModule],
})
export class ADClosingRoomComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    paramsSub: any;

    userInfo: LoginUser;
    userSession: string = '';

    viewData: boolean = false;

    pageTitle: string = '';

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _els: EscrowOrderListService,
    )
    {
        this._gfs.showLog('ADClosingRoomComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngOnInit(): void {
        this._gfs.showLog('ADClosingRoomComponent', 'ngOnInit', '', null);
        this.userInfo = this._ts.getUser();
        this.userSession = this._ts.getToken();

        //alert("(pre)Page Title: " + this.pageTitle);
        //this.paramsSub = this._activatedRoute.params.subscribe((params) => {
        //    this.pageTitle = params['pageTitle'];
        //});
        //alert("(post)Page Title: " + this.pageTitle);

        //this.getListing();
        
    }

}