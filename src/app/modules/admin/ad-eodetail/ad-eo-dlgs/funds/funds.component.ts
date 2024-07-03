import { NgIf, CommonModule } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { EscrowParams } from "app/modules/_modules/escrowclasses";
import { FundingInformation } from "app/modules/_modules/fundingclass";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { FundingService } from "app/modules/_services/fundinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { MiscService } from "app/modules/_services/miscinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { AddReceivedFundsComponent } from "../add-received-funds/add-received-funds.component";
import { AddReleasedFundsComponent } from "../add-released-funds/add-released-funds.component";
import { FundStatementsComponent } from "../fund-statements/fund-statements.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { DService } from "app/modules/_services/dlgsvc.service";

@Component({
    selector: 'funds',
      standalone: true,
      templateUrl: './funds.component.html',
      encapsulation: ViewEncapsulation.None,
      imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, 
        MatPaginatorModule, MatSortModule, MatTableModule, MatDatepickerModule, 
        MatFormFieldModule, MatExpansionModule, ],
})
export class FundsComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = 0;
    receivedFundsList: FundingInformation[] = [];
    releasedFundsList: FundingInformation[] = [];
    receivedCollectionSize: number = this.receivedFundsList.length;
    releasedCollectionSize: number = this.releasedFundsList.length;
    receivedDataSource: MatTableDataSource<FundingInformation>;
    releasedDataSource: MatTableDataSource<FundingInformation>;
    receivedDisplayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'company', 'description', 'dateModified', 'fundAmount', 'edit'];
    releasedDisplayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'company', 'description', 'dateModified', 'fundAmount', 'edit'];  

    totalReceived: number = 10;
    totalReleased: number = 0;
    totalFunds: number = this.totalReceived + this.totalReleased;

    @ViewChild('releasedPaginator') releasedPaginator: MatPaginator;
    @ViewChild('releasedSort') releasedSort: MatSort;
    @ViewChild('receivedPaginator') receivedPaginator: MatPaginator;
    @ViewChild('receivedSort') receivedSort: MatSort;
    @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

    constructor(
        private _activatedRoute: ActivatedRoute,
            private _authService: AuthService,
            private _httpClient: HttpClient,
            private _rtr: Router,
            private _ts: TokenStorageService,
            private _acservice: AircraftService,
            private _ms: MiscService,
            private _fs: FundingService,
            private _dsservice: DService,
            private _dialog: MatDialog,
            public _dialogRef: MatDialogRef<FundsComponent>,
    ) 
    {        
        this._gfs.showLog('FundsComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
        this.receivedDataSource = new MatTableDataSource<FundingInformation>(this.receivedFundsList);
        this.releasedDataSource = new MatTableDataSource<FundingInformation>(this.releasedFundsList);
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('FundsComponent', 'ngAfterViewInit', '', null);
        this.releasedDataSource.sort = this.releasedSort;
        this.releasedDataSource.paginator = this.releasedPaginator;
        this.receivedDataSource.sort = this.receivedSort;
        this.receivedDataSource.paginator = this.receivedPaginator;
    }
    
    ngOnInit(): void {
        this._gfs.showLog('FundsComponent', 'ngOnInit', '', null);
        this.getFormData();
    }
    
    calculateTotals(): void {
        this._gfs.showLog('FundsComponent', 'calculateTotals', '', null);
        this.totalFunds = this.totalReceived + this.totalReleased;
    
    }
    
    getFormData(): void {
        this._gfs.showLog('FundsComponent', 'getFormData', '', null);
        this.getFundingListReceived();
        this.getFundingListReleased();
    }
    
    setData(eid: number): void {
        this._gfs.showLog('FundsComponent', 'setData', '', null);
        this.escrowOrderID = eid;    
    }

    getFundingListReleased(): void {
        this._gfs.showLog('FundsComponent', 'getFundingListReleased', '', null);

        let epdto = new EscrowParams();
        epdto.escrowOrderID = this.escrowOrderID;
        epdto.fundListType = "Released";
    
        this._fs.getInitialFundingList(epdto).subscribe({
          next: (fundlist: any) => {
            this._gfs.showLog('FundsComponent', 'getFundingListReleased', 'Response:', fundlist);
            this.releasedFundsList = fundlist.data;
            this.totalReleased = fundlist.data.reduce((acc, obj) => { return acc + obj.fundAmount; }, 0);
            this.calculateTotals();
            this.releasedCollectionSize = this.releasedFundsList.length;
            this.releasedDataSource = new MatTableDataSource<FundingInformation>(this.releasedFundsList);
            this.releasedDataSource.sort = this.releasedSort;
            this.releasedDataSource.paginator = this.releasedPaginator;        
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('FundsComponent', 'getFundingListReleased', 'Error:', err);
            if(err.status == 401){
                this._ts.signOut();
                this._rtr.navigate(['/sign-in']);
            }
          }
        });
    
    }
    
    getFundingListReceived(): void {
        this._gfs.showLog('FundsComponent', 'getFundingListReceived', '', null);
    
        let epdto = new EscrowParams();
        epdto.escrowOrderID = this.escrowOrderID;
        epdto.fundListType = "Received";
    
        this._fs.getInitialFundingList(epdto).subscribe({
          next: (fundlist: any) => {
            this._gfs.showLog('FundsComponent', 'getFundingListReceived', 'Response:', fundlist);
            this.receivedFundsList = fundlist.data;
            this.totalReceived = fundlist.data.reduce((acc, obj) => { return acc + obj.fundAmount; }, 0);
            this.calculateTotals();
            this.receivedCollectionSize = this.receivedFundsList.length;
            this.receivedDataSource = new MatTableDataSource<FundingInformation>(this.receivedFundsList);
            this.receivedDataSource.sort = this.receivedSort;
            this.receivedDataSource.paginator = this.receivedPaginator;        
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('FundsComponent', 'getFundingListReceived', 'Error:', err);
            if(err.status == 401){
                this._ts.signOut();
                this._rtr.navigate(['/sign-in']);
            }
          }
        });
    
    }

    thecallback(): void { this.getFormData();  }

    openAddReceivedFunds(): void {
      this._dsservice.openAddReceivedFunds('fs-dialog', 'medium', 'small', this.escrowOrderID, this);    
    }
    
    openAddReleasedFunds(): void {
      this._dsservice.openAddReleasedFunds('fs-dialog', 'medium', 'small', this.escrowOrderID, this);
    }
    
    openCAStatements(): void {
      this._dsservice.openCAStatements('fs-dialog', 'large', 'large', this.escrowOrderID, this);
    }

    openEditReceivedFunds(fundID: number): void {
      this._dsservice.openEditReceivedFunds('fs-dialog', 'medium', 'small', fundID, this.escrowOrderID, this);
      //(click)="openEditReceivedFunds(element.itemID, true, true, 'fullscreen-dialog', '70', '60')"
    }

    openEditReleasedFunds(fundID: number): void {
      this._dsservice.openEditReleasedFunds('fs-dialog', 'medium', 'small', fundID, this.escrowOrderID, this);
      //(click)="openEditReleasedFunds(element.itemID, true, true, 'fullscreen-dialog', '70', '60')"
    }

    


}