import { NgIf, CommonModule } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { AccountingList, ClosingList } from "app/modules/_modules/fundingclass";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { FundingService } from "app/modules/_services/fundinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { MiscService } from "app/modules/_services/miscinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { EditReleasedFundsComponent } from "../edit-released-funds/edit-released-funds.component";
import { MatMenuTrigger } from "@angular/material/menu";
import { EscrowParams } from "app/modules/_modules/escrowclasses";
import { CreateAccountingStatementComponent } from "../create-accounting-statement/create-accounting-statement.component";
import { CreateClosingStatementComponent } from "../create-closing-statement/create-closing-statement.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { DService } from "app/modules/_services/dlgsvc.service";

@Component({
    selector: 'fund-statements',
      standalone: true,
      templateUrl: './fund-statements.component.html',
      encapsulation: ViewEncapsulation.None,
      imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, 
        MatPaginatorModule, MatSortModule, MatTableModule, MatDatepickerModule, 
        MatFormFieldModule, MatExpansionModule, ],
        
})
export class FundStatementsComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = 0;
    totalClosing: number = 0;
    totalAccounting: number = 0;
    closingDataSource: MatTableDataSource<ClosingList>;
    accountingDataSource: MatTableDataSource<AccountingList>;
    closingFundsList: ClosingList[] = [];
    accountingFundsList: AccountingList[] = [];
    closingCollectionSize: number = this.closingFundsList.length;
    accountingCollectionSize: number = this.accountingFundsList.length;
  
    closingDisplayedColumns: string[] = ['statementTitle', 'participant', 'dateCreated', 'dateModified', 'isLocked', 'details'];
    //statementID: number = -1;
    
    accountingDisplayedColumns: string[] = ['itemID', 'dateCreated', 'dateModified', 'isLocked', 'details'];
    //itemID: number = -1;

    @ViewChild('closingPaginator') closingPaginator: MatPaginator;
    @ViewChild('closingSort') closingSort: MatSort;
    @ViewChild('accountingPaginator') accountingPaginator: MatPaginator;
    @ViewChild('accountingSort') accountingSort: MatSort;
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
            private _dsfund: DService,
            private _dialog: MatDialog,
            public _dialogRef: MatDialogRef<EditReleasedFundsComponent>,
    ) 
    {        
        this._gfs.showLog('FundStatementsComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
        this.closingDataSource = new MatTableDataSource<ClosingList>(this.closingFundsList);
        this.accountingDataSource = new MatTableDataSource<AccountingList>(this.accountingFundsList);
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('FundStatementsComponent', 'ngAfterViewInit', '', null);
        this.closingDataSource.sort = this.closingSort;
        this.closingDataSource.paginator = this.closingPaginator;
        this.accountingDataSource.sort = this.accountingSort;
        this.accountingDataSource.paginator = this.accountingPaginator;
    }
    
    ngOnInit(): void {
        this._gfs.showLog('FundStatementsComponent', 'ngOnInit', '', null);
        this.getFormData();
    }

    getFormData(): void {
        this._gfs.showLog('FundStatementsComponent', 'getFormData', '', null);
        this.getClosingList();
        this.getAccountingList();
    }
    
    setData(eid: number): void {
        this._gfs.showLog('FundStatementsComponent', 'setData', '', null);
        this.escrowOrderID = eid;    
    }

    getClosingList(): void {
        this._gfs.showLog('FundStatementsComponent', 'getClosingList', '', null);

        let epdto = new EscrowParams();
        epdto.escrowOrderID = this.escrowOrderID;
        
        this._fs.getClosingList(epdto).subscribe({
          next: (cllist: any) => {
            this._gfs.showLog('FundStatementsComponent', 'getClosingList', 'Response:', cllist);
            this.closingFundsList = cllist.data;
            this.closingCollectionSize = this.closingFundsList.length;
            this.closingDataSource = new MatTableDataSource<ClosingList>(this.closingFundsList);
            this.closingDataSource.sort = this.closingSort;
            this.closingDataSource.paginator = this.closingPaginator;        
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('FundStatementsComponent', 'getClosingList', 'Error:', err);
            if(err.status == 401){
                this._ts.signOut();
                this._rtr.navigate(['/sign-in']);
            }
          }
        });
        
    
    }
    
    getAccountingList(): void {
        this._gfs.showLog('FundStatementsComponent', 'getAccountingList', '', null);
    
        let epdto = new EscrowParams();
        epdto.escrowOrderID = this.escrowOrderID;
    
        this._fs.getAccountingList(epdto).subscribe({
          next: (cllist: any) => {
            this._gfs.showLog('FundStatementsComponent', 'getAccountingList', 'Response:', cllist);
            this.accountingFundsList = cllist.data;
            this.accountingCollectionSize = this.accountingFundsList.length;
            this.accountingDataSource = new MatTableDataSource<AccountingList>(this.accountingFundsList);
            this.accountingDataSource.sort = this.accountingSort;
            this.accountingDataSource.paginator = this.accountingPaginator;        
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('FundStatementsComponent', 'getAccountingList', 'Error:', err);
            if(err.status == 401){
                this._ts.signOut();
                this._rtr.navigate(['/sign-in']);
            }
          }
        });  
    
    }

    thecallback(): void { this.getFormData();  }

    openAddClosingStatement(): void {
      this._dsfund.openAddClosingStatement('fs-dialog', 'large', 'large', this.escrowOrderID, this);    
    }
    
    openAddAccountingStatement(): void {
      this._dsfund.openAddAccountingStatement('fs-dialog', 'large', 'large', this.escrowOrderID, this);
    }


    

}