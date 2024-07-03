import { NgIf, CommonModule } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { EscrowParams } from "app/modules/_modules/escrowclasses";
import { FundingInformation } from "app/modules/_modules/fundingclass";
import { ServiceResponse, StringListItem } from "app/modules/_modules/serviceclasses";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { FundingService } from "app/modules/_services/fundinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { MiscService } from "app/modules/_services/miscinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { AnyKindOfDictionary } from "lodash";


@Component({
    selector: 'edit-received-funds',
        standalone: true,
        templateUrl: './edit-received-funds.component.html',
        encapsulation: ViewEncapsulation.None,
        imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatPaginatorModule, 
            MatSortModule, MatTableModule, MatDatepickerModule, MatFormFieldModule],
})
export class EditReceivedFundsComponent {
  
    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = 0;
    fundID: number = 0;

    firstName: string = '';
    middleName: string = '';
    lastName: string = '';
    company: string = '';
    amount: number = 0.00;
    currencyCode: string = 'USD';
    description: string = '';
    fundType: string = '';
    fundDate: Date | null = null;
  
    currencyCodeList: StringListItem[];

    availableFundTypes: string[] = ['Received', 'Released'];

    constructor(
        private _activatedRoute: ActivatedRoute,
            private _authService: AuthService,
            private _httpClient: HttpClient,
            private _rtr: Router,
            private _ts: TokenStorageService,
            private _acservice: AircraftService,
            private _ms: MiscService,
            private _fs: FundingService,
            private _dialog: MatDialog,
            public _dialogRef: MatDialogRef<EditReceivedFundsComponent>,
    ) 
    {        
        this._gfs.showLog('EditReceivedFunds', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('EditReceivedFunds', 'ngAfterViewInit', '', null);
        this.getCurrencyCodes();
        this.getFundInfo();
    }
    
    ngOnInit(): void {
        this._gfs.showLog('EditReceivedFunds', 'ngOnInit', '', null);
    }

    setData(eid: number, fid: number): void {
        this._gfs.showLog('EditReceivedFunds', 'setData', '', null);
        this.escrowOrderID = eid;
        this.fundID = fid;
    
    }

    getFundInfo(): void {
        this._gfs.showLog('EditReceivedFunds', 'getFundInfo', '', null);
        let epdto = new EscrowParams();
        epdto.escrowOrderID = this.escrowOrderID;
        epdto.fundsID = this.fundID;
        epdto.fundListType = "Received";
    
        this._fs.getInitialFundingInformation(epdto).subscribe({
          next: (fundinfo: any) => {
            this._gfs.showLog('EditReceivedFunds', 'getFundInfo', 'Response:', fundinfo);
            if(fundinfo.success){
              this.firstName = fundinfo.data.firstName;
              this.middleName = fundinfo.data.middleName;
              this.lastName = fundinfo.data.lastName;
              this.company = fundinfo.data.company;
              this.amount = fundinfo.data.fundAmount;
              this.currencyCode = fundinfo.data.currencyCode;
              this.description = fundinfo.data.description;
              this.fundDate = fundinfo.data.dateModified;
              this.fundType = fundinfo.data.fundType;
    
            }
            else{
              alert('Unable to retrieve data.');    
            }
    
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('EditReceivedFunds', 'getFundInfo', 'Error:', err);
            if (err.status == 401) {
                this._ts.signOut();
                this._rtr.navigate(['/sign-in']);
            }
          }
        });
    
      }
    
      deleteFunds(): void {
        this._gfs.showLog('EditReceivedFunds', 'deleteFunds', '', null);
        let epdto = new EscrowParams();
        epdto.escrowOrderID = this.escrowOrderID;
        epdto.fundsID = this.fundID;
        epdto.fundListType = "Received";
    
        this._fs.deleteInitialFunding(epdto).subscribe({
          next: (resp: any) => {
            this._gfs.showLog('EditReceivedFunds', 'deleteFunds', 'Response:', resp);
            if(resp.success){
              this._dialogRef.close();
    
            }
            else{
              alert('Unable to delete data.');
    
            }
    
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('EditReceivedFunds', 'deleteFunds', 'Error:', err);
            if (err.status == 401) {
                this._ts.signOut();
                this._rtr.navigate(['/sign-in']);
            }
          }
        });
    
      }
    
      saveFunds(): void {
        this._gfs.showLog('EditReceivedFunds', 'saveFunds', '', null);
        let dd = this.buildDto();
        this._fs.saveInitialFunding(dd).subscribe({
          next: (resp: any) => {
            this._gfs.showLog('EditReceivedFunds', 'saveFunds', 'Response:', resp);
            if(resp.data){
              this._dialogRef.close();
            }
            else{
              let msg = resp.message;
              if(msg == null || msg == ''){
                msg = "Unable to save funding.";
              }
              alert(msg);
            }
    
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('EditReceivedFunds', 'saveFunds', 'Error:', err);
            if (err.status == 401) {
                this._ts.signOut();
                this._rtr.navigate(['/sign-in']);
            }
          }
        });
    
      }
    
      buildDto(): FundingInformation {
        let dd = new FundingInformation();
        dd.escrowOrderID = this.escrowOrderID;
        dd.dateModified = this.fundDate;
        dd.fundAmount = this.amount;
        dd.firstName = this.firstName;
        dd.middleName = this.middleName;
        dd.lastName = this.lastName;
        dd.company = this.company;
        dd.currencyCode = this.currencyCode;
        dd.description = this.description;
        dd.fundType = this.fundType;
        dd.dateModified = this.fundDate;
        dd.itemID = this.fundID;
        return dd;
      }
    
      getCurrencyCodes(): void {
        this._gfs.showLog('EditReceivedFunds', 'getCurrencyCodes', '', null);
        this._ms.getCurrencyCodes().subscribe({
          next: (orders: any) => {
            this._gfs.showLog('EditReceivedFunds', 'getCurrencyCodes', 'Response:', orders);
            this.currencyCodeList = orders.data;
    
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('EditReceivedFunds', 'getCurrencyCodes', 'Error:', err);
            if (err.status == 401) {
                this._ts.signOut();
                this._rtr.navigate(['/sign-in']);
            }
          }
        });
      }
    

}