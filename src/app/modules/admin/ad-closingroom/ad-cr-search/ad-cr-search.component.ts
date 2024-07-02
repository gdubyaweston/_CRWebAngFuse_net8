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
import { EscrowList, EscrowListSearch, OrderStatus } from 'app/modules/_modules/escrowclasses';
import { LoginUser } from 'app/modules/_modules/loginclasses';
import { UserDetail } from 'app/modules/_modules/userclasses';
import { EscrowOrderListService } from 'app/modules/_services/eolist.service';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';
import { TokenStorageService } from 'app/modules/_services/tsinfo.service';
import { IntListItem } from 'app/modules/_modules/serviceclasses';
import { MiscService } from 'app/modules/_services/miscinfo.service';

@Component({
    selector     : 'ad-cr-search',
    standalone   : true,
    templateUrl  : './ad-cr-search.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [NgIf, CommonModule, FormsModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTooltipModule],
})
export class ADCRSearchComponent
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

    escrowOrderID: string;
    orderStatusList: IntListItem[] = [];
    userList: IntListItem[] = [];
    selectedUserID: number;
    selectedStatusID: number;

    

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
        private _ms: MiscService,
    )
    {
        this._gfs.showLog('ADCRSearchComponent', 'constructor', '', null);
        this._gfs.allowCall = true;
        this.resetSearchCriteria();
        this.dataSource = new MatTableDataSource(this.daList);
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('ADCRSearchComponent', 'ngAfterViewInit', '', null);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = this.daFilterValue;
    }

    ngOnInit(): void {
        this._gfs.showLog('ADCRSearchComponent', 'ngOnInit', '', null);
        this.userInfo = this._ts.getUser();
        this.userSession = this._ts.getToken();

        this.getUsers();
        this.getEscrowOrderStatus();

        this.selectedStatusID = -1;
        this.selectedUserID = -1;
        this.escrowOrderID = '';

        //this.getListing();
        
    }

    ngOnDestroy(): void {
        this._gfs.showLog('ADCRSearchComponent', 'ngOnDestroy', '', null);
    }

    onClickOpenClose(): void {
        //alert('Hello There Open/Close');
        let element = document.getElementById("myDivHide");
        let hidden = element.getAttribute("hidden");
        if (hidden) {
            element.removeAttribute("hidden");
            //button.innerText = "Hide div";
         } else {
            element.setAttribute("hidden", "hidden");
            //button.innerText = "Show div";
         }
    }

    resetSearchCriteria(): void {
        this._gfs.showLog('ADCRSearchComponent', 'resetSearchCriteria', null, '');
        this.submittedByID = 0; // this._ts.getUser().vectorsUID; // 128
        this.orderStatusID = 0;  // 10 - open, 17 - closed
        this.checkedOutToID = 0;
    }

    getListing(): void {
        this._gfs.showLog('ADCRSearchComponent', 'getListing', '', null);
        
        if (this.userInfo && this.userInfo.email && this.userSession) {
            this._gfs.showLog('ADCRSearchComponent', 'getListing', 'Get Information:', null);

            if(this.validSearch()){
                let elp = new EscrowListSearch();
                elp.escrowOrderID = this.escrowOrderID;
                elp.orderStatusID = this.selectedStatusID; 
                elp.submittedByID = this.selectedUserID;
                elp.checkedOutToID = this.checkedOutToID;
                this._gfs.showLog('ADCRSearchComponent', 'getListing', 'ELP:', elp);
                this._gfs.showLog('ADCRSearchComponent', 'getListing', 'Get Information: Call Backend', null);

                this._els.getEscrowOrderList(elp).subscribe({
                    next: (response: any) => {
                        this._gfs.showLog('ADCRSearchComponent', 'getListing', 'Response:', response);
    
                        if(response.success && response.data && response.data.length > 0){
                            this._gfs.showLog('ADCRSearchComponent', 'getListing', 'Get Escrow List Success:', null);
                            
                            this.daList = response.data;
                            this.daCollectionSize = this.daList.length;
                            this.dataSource = new MatTableDataSource(this.daList);
                            this.dataSource.sort = this.sort;
                            this.dataSource.paginator = this.paginator;
                            this.dataSource.filter = this.daFilterValue;
                        }
                        else{
                            this._gfs.showLog('ADCRSearchComponent', 'getListing', 'Get Escrow List Fail:', null);
                        }
    
                    },
                    error: (err: HttpErrorResponse) => {
                        this._gfs.showLog('ADCRSearchComponent', 'getListing', 'Error:', err);
                        if(err.status == 401){
                            this._ts.signOut();
                            this._rtr.navigate(['/sign-in']);
                        }
                    },
                });
            }// end valid search
            

        } else {
            this._gfs.showLog('ADCRSearchComponent', 'getListing', 'BAD INFO:', null);
        }
    }

    validSearch(): boolean {

        if(this.escrowOrderID && this.escrowOrderID.length > 0){
            return true;
        }
        if(this.selectedStatusID > 0 && this.selectedUserID > 0){
            return true;
        }
        if(this.selectedStatusID > 0 && this.escrowOrderID && this.escrowOrderID.length > 0){
            return true;
        }
        if(this.selectedUserID > 0 && this.escrowOrderID && this.escrowOrderID.length > 0){
            return true;
        }
        return false;
    }


    getUsers(): void {
        this.userList = [];
        this.userList.push({id: -1, name: 'Please Make Selection'});

        this._gfs.showLog('ADCRSearchComponent', 'getUsers', '', null);

        this._ms.getEscrowUserList().subscribe({
            next: (response: any) => {
                this._gfs.showLog('ADCRSearchComponent', 'getUsers', 'Response:', response);

                if(response.success && response.data && response.data.length > 0){
                    this._gfs.showLog('ADCRSearchComponent', 'getUsers', 'Get User List Success:', null);
                    
                    this.userList = response.data;
                    this.userList.unshift({id: -1, name: 'Please Make Selection'});                    
                }
                else{
                    this._gfs.showLog('ADCRSearchComponent', 'getUsers', 'Get User List Fail:', null);
                }

            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog('ADCRSearchComponent', 'getUsers', 'Error:', err);
                if(err.status == 401){
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }
            },
        });
        



    }

    getEscrowOrderStatus(): void {
        this.orderStatusList = [];
        this.orderStatusList.push({id: -1, name: 'Please Make Selection'});

        this._gfs.showLog('ADCRSearchComponent', 'getEscrowOrderStatus', '', null);

        this._ms.getEscrowOrderStatusTypeList().subscribe({
            next: (response: any) => {
                this._gfs.showLog('ADCRSearchComponent', 'getEscrowOrderStatus', 'Response:', response);

                if(response.success && response.data && response.data.length > 0){
                    this._gfs.showLog('ADCRSearchComponent', 'getEscrowOrderStatus', 'Get Escrow Types List Success:', null);
                    
                    this.orderStatusList = response.data;
                    this.orderStatusList.unshift({id: -1, name: 'Please Make Selection'});                    
                }
                else{
                    this._gfs.showLog('ADCRSearchComponent', 'getEscrowOrderStatus', 'Get Escrow Type List Fail:', null);
                }

            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog('ADCRSearchComponent', 'getEscrowOrderStatus', 'Error:', err);
                if(err.status == 401){
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }
            },
        });


    }

    doSearch(): void {
        this._gfs.showLog('ADCRSearchComponent', 'doSearch', '', null);

        this.searchEscrowID();
        this.searchEscrowOrderStatus();
        this.searchEscrowUser();
        // retrieve
        // build main list
    }

    searchEscrowID(): void {
        this._gfs.showLog('ADCRSearchComponent', 'searchEscrowID', '', null);
    }

    searchEscrowOrderStatus(): void {
        this._gfs.showLog('ADCRSearchComponent', 'searchEscrowOrderStatus', '', null);
    }

    searchEscrowUser(): void {
        this._gfs.showLog('ADCRSearchComponent', 'searchEscrowUser', '', null);
    }

    showDetails(escrowOrderID: number): void {
        this._gfs.showLog('ADCRAllComponent', 'showDetails', 'escrowOrderID:', escrowOrderID);
        
        if(escrowOrderID > 0){
            this._gfs.showLog('ADCRAllComponent', 'showDetails', 'goingToOpen:', escrowOrderID);                       

            this._rtr.navigateByUrl('/ad-eodetail/' + escrowOrderID);

        }


    }

   


}