import { NgIf, CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { EscrowList, EscrowListSearch } from 'app/modules/_modules/escrowclasses';
import { LoginUser } from 'app/modules/_modules/loginclasses';
import { EscrowOrderListService } from 'app/modules/_services/eolist.service';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';
import { TokenStorageService } from 'app/modules/_services/tsinfo.service';

@Component({
    selector     : 'ad-cr-closed',
    standalone   : true,
    templateUrl  : './ad-cr-closed.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [NgIf, CommonModule, FormsModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTooltipModule],
})
export class ADCRClosedComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    userInfo: LoginUser;
    userSession: string = '';
    submittedByID: number;
    orderStatusID: number;
    checkedOutToID: number;
    daList: EscrowList[] = [];
    daCollectionSize: number = this.daList.length; 
    daColumns: string[] = ['view', 'escrowOrderID', 'orderStatus', 'orderDate', 'submittedByName', 'escrowDescription', 'participantDisplay', 'end'];
    dataSource: MatTableDataSource<EscrowList>; 
    daFilterValue: string; 

    currentDT: Date = new Date();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    maxL: number = this._gfs.getMaxLength();

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
        this._gfs.showLog('ADCRClosedComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
        this.resetSearchCriteria();
        this.dataSource = new MatTableDataSource(this.daList);
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('ADCRClosedComponent', 'ngAfterViewInit', '', null);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = this.daFilterValue;
    }

    ngOnInit(): void {
        this._gfs.showLog('ADCRClosedComponent', 'ngOnInit', '', null);
        this.userInfo = this._ts.getUser();
        this.userSession = this._ts.getToken();

        this.getListing();
        
    }

    ngOnDestroy(): void {
        this._gfs.showLog('ADCRClosedComponent', 'ngOnDestroy', '', null);
    }

    resetSearchCriteria(): void {
        this._gfs.showLog('ADCRClosedComponent', 'resetSearchCriteria', null, '');
        this.submittedByID = this._ts.getUser().vectorsUID; // 128
        this.orderStatusID = 17; // 10 - open, 17 - closed
        this.checkedOutToID = 0;
    }

    getListing(): void {
        this._gfs.showLog('ADCRClosedComponent', 'getListing', '', null);
        
        if (this.userInfo && this.userInfo.email && this.userSession) {
            this._gfs.showLog('ADCRClosedComponent', 'getListing', 'Get Information:', null);
            
            let elp = new EscrowListSearch();
            elp.orderStatusID = this.orderStatusID; // 10 = Open Orders
            elp.submittedByID = this.submittedByID;
            elp.checkedOutToID = this.checkedOutToID;
            this._gfs.showLog('ADCRClosedComponent', 'getListing', 'ELP:', elp);
            this._gfs.showLog('ADCRClosedComponent', 'getListing', 'Get Information: Call Backend', null);

            // call the service
            this._els.getEscrowOrderList(elp).subscribe({
                next: (response: any) => {
                    this._gfs.showLog('ADCRClosedComponent', 'getListing', 'Response:', response);

                    if(response.success && response.data && response.data.length > 0){
                        this._gfs.showLog('ADCRClosedComponent', 'getListing', 'Get Escrow List Success:', null);
                        
                        this.daList = response.data;
                        this.daCollectionSize = this.daList.length;
                        this.dataSource = new MatTableDataSource(this.daList);
                        this.dataSource.sort = this.sort;
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.filter = this.daFilterValue;
                    }
                    else{
                        this._gfs.showLog('ADCRClosedComponent', 'getListing', 'Get Escrow List Fail:', null);
                    }

                },
                error: (err: HttpErrorResponse) => {
                    this._gfs.showLog('ADCRClosedComponent', 'getListing', 'Error:', err);
                    if(err.status == 401){
                        this._ts.signOut();
                        this._rtr.navigate(['/sign-in']);
                    }
                },
            });

        } else {
            this._gfs.showLog('ADCRClosedComponent', 'getListing', 'BAD INFO:', null);
        }
    }

    showDetails(escrowOrderID: number): void {
        this._gfs.showLog('ADCRClosedComponent', 'showDetails', 'escrowOrderID:', escrowOrderID);
        
        if(escrowOrderID > 0){
            this._gfs.showLog('ADCRClosedComponent', 'showDetails', 'goingToOpen:', escrowOrderID);                       

            this._rtr.navigateByUrl('/ad-eodetail/' + escrowOrderID);

        }


    }

}