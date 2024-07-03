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
import { CustomerInfo, CustomerParams } from 'app/modules/_modules/customerclasses';
import { EscrowList } from 'app/modules/_modules/escrowclasses';
import { LoginUser } from 'app/modules/_modules/loginclasses';
import { CustomerService } from 'app/modules/_services/custinfo.service';
import { DService } from 'app/modules/_services/dlgsvc.service';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';
import { MiscService } from 'app/modules/_services/miscinfo.service';
import { TokenStorageService } from 'app/modules/_services/tsinfo.service';

@Component({
    selector     : 'ad-search-customers',
    standalone   : true,
    templateUrl  : './ad-search-customers.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [NgIf, CommonModule, FormsModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTooltipModule],
})
export class ADSearchCustomersComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    lastNameSearch: string = '';
    nNumberSearch: string = '';
    serialNumberSearch: string = '';
    companySearch: string = '';
    emailSearch: string = '';
    customerID: number = 0;
    orderID: number = 0;

    userInfo: LoginUser;
    userSession: string = '';

    daList: CustomerInfo[] = [];
    daCollectionSize: number = this.daList.length; 
    daColumns: string[] = ['view', 'departmentID', 'status', 'displayName', 'nNumber', 'email', 'companyName', 'customerID', 'orderID', 'sn', 'end'];
    daColumns2: string[] = ['view', 'escrowOrderID', 'orderStatus', 'orderDate', 'submittedByName', 'escrowDescription', 'participantDisplay', 'end'];
    dataSource: MatTableDataSource<CustomerInfo>; 
    daFilterValue: string; 

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _ms: MiscService,
        private _cs: CustomerService,
        private _ds: DService,
    )
    {
        this._gfs.showLog('ADSearchCustomersComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('ADSearchCustomersComponent', 'ngAfterViewInit', '', null);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = this.daFilterValue;
    }

    ngOnInit(): void {
        this._gfs.showLog('ADSearchCustomersComponent', 'ngOnInit', '', null);
        this.userInfo = this._ts.getUser();
        this.userSession = this._ts.getToken();
       
        
    }

    ngOnDestroy(): void {
        this._gfs.showLog('ADSearchCustomersComponent', 'ngOnDestroy', '', null);
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

    retrieveCustomers(): void {
        this._gfs.showLog('ADSearchCustomersComponent', 'retrieveCustomers', '', null);
        if(this.hasCriteria()){
            //alert('GIVE ME PEOPLE!!!!!');
            var srch = new CustomerParams();
            if (this.lastNameSearch !== null && this.lastNameSearch.length > 0){
                srch.lastName = this.lastNameSearch;
            }
            if (this.nNumberSearch !== null && this.nNumberSearch.length > 0){
                srch.nNumber = this.nNumberSearch;
            }
            if (this.serialNumberSearch !== null && this.serialNumberSearch.length > 0){
                srch.serialNumber = this.serialNumberSearch;
            }
            if (this.companySearch !== null && this.companySearch.length > 0){
                srch.company = this.companySearch;
            }
            if (this.emailSearch !== null && this.emailSearch.length > 0){
                srch.email = this.emailSearch;
            }
            
            this._cs.getCustomerList(srch).subscribe({
                next: (response: any) => {
                    this._gfs.showLog('ADSearchCustomersComponent', 'retrieveCustomers', 'Response:', response);
                    if(response.success && response.data && response.data.length > 0){
                        this._gfs.showLog('ADSearchCustomersComponent', 'retrieveCustomers', 'Get Customer List Success:', null);
                        
                        this.daList = response.data;
                        this.daCollectionSize = this.daList.length;
                        this.dataSource = new MatTableDataSource(this.daList);
                        this.dataSource.sort = this.sort;
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.filter = this.daFilterValue;
                    }
                    else{
                        this._gfs.showLog('ADSearchCustomersComponent', 'retrieveCustomers', 'Get Customer List Fail:', null);
                    }
                },
                error: (err: HttpErrorResponse) => {
                    this._gfs.showLog('ADSearchCustomersComponent', 'retrieveCustomers', 'Error:', err);
                    if(err.status == 401){
                        this._ts.signOut();
                        this._rtr.navigate(['/sign-in']);
                    }
                },
                
            });

            
        }
        else{
            alert('Nothing To Search For!!!!!');
        }
        
    }

    hasCriteria(): boolean {
        var hasC = false;

        if (this.lastNameSearch !== null && this.lastNameSearch.length > 0){
            hasC = true;
        }
        if (this.nNumberSearch !== null && this.nNumberSearch.length > 0){
            hasC = true;
        }
        if (this.serialNumberSearch !== null && this.serialNumberSearch.length > 0){
            hasC = true;
        }
        if (this.companySearch !== null && this.companySearch.length > 0){
            hasC = true;
        }
        if (this.emailSearch !== null && this.emailSearch.length > 0){
            hasC = true;
        }
    
        return hasC;
    }
    
    selectCustomer(customerData: CustomerInfo): void {
        //alert('Select Customer Called');
        //alert('Customer ID: ' + customerData.customerID + ' Order ID: ' + customerData.orderID + ' Serial Number: ' + customerData.sn );
        
        this._gfs.showLog('ADSearchCustomersComponent', 'selectCustomer', '', null);

        this._ds.openADSearchCustomer('fs-dialog', 'xlarge', 'xlarge', customerData, this);
        /*
        if(this.hasCriteria2()){
            alert('GIVE ME PEOPLE!!!!!');
            var srch = new CustomerParams();
            if (this.customerID !== null && this.customerID > 0){
                srch.customerID = this.customerID;
            }
            if (this.orderID !== null && this.orderID > 0){
                srch.orderID = this.orderID;
            }
            if (this.serialNumberSearch !== null && this.serialNumberSearch.length > 0){
                srch.serialNumber = this.serialNumberSearch;
            }
                        
            this._cs.getCustomerInfo(srch).subscribe({
                next: (response: any) => {
                    this._gfs.showLog('ADSearchCustomersComponent', 'retrieveCustomer', 'Response:', response);
                    if(response.success && response.data && response.data.length > 0){
                        this._gfs.showLog('ADSearchCustomersComponent', 'retrieveCustomer', 'Get Customer List Success:', null);
                        
                        this.daInfo = response.data;
                        
                    }
                    else{
                        this._gfs.showLog('ADSearchCustomersComponent', 'retrieveCustomer', 'Get Customer List Fail:', null);
                    }
                },
                error: (err: HttpErrorResponse) => {
                    this._gfs.showLog('ADSearchCustomersComponent', 'retrieveCustomer', 'Error:', err);
                    if(err.status == 401){
                        this._ts.signOut();
                        this._rtr.navigate(['/sign-in']);
                    }
                },
                
            });

            
        }
        else{
            alert('No Customer To Search For!!!!!');
        }
        */
    }

    thecallback(): void { }
/*
    openADSearchCustomer(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: CustomerInfo, dd: ADEODetailComponent): void {
        var w = this.dlgWidth(dlgSizeW);
        var h = this.dlgHeight(dlgSizeH);
        
        const dr = this._dialog.open(ADSearchCustomerShowComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: w + '%', height: h + '%'
          });
    
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
  
        //dr.afterClosed().subscribe(result => {alert('hello23');});
        
    }
*/
}