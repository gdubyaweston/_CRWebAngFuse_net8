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
import { FundingInformation } from "app/modules/_modules/fundingclass";
import { StringListItem } from "app/modules/_modules/serviceclasses";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { FundingService } from "app/modules/_services/fundinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { MiscService } from "app/modules/_services/miscinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";



@Component({
    selector: 'add-released-funds',
        standalone: true,
        templateUrl: './add-released-funds.component.html',
        encapsulation: ViewEncapsulation.None,
        imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatPaginatorModule, 
            MatSortModule, MatTableModule, MatDatepickerModule, MatFormFieldModule],
})
export class AddReleasedFundsComponent {

  _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = 0;
    firstName: string = '';
    middleName: string = '';
    lastName: string = '';
    company: string = '';
    amount: number = 0.00;
    currencyCode: string = 'USD';
    description: string = '';
    fundDate: Date | null = null;
  
    currencyCodeList: StringListItem[];

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
            public _dialogRef: MatDialogRef<AddReleasedFundsComponent>,
    ) 
    {        
        this._gfs.showLog('AddReleasedFunds', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('AddReleasedFunds', 'ngAfterViewInit', '', null);
        this.getCurrencyCodes();
    }
    
    ngOnInit(): void {
        this._gfs.showLog('AddReleasedFunds', 'ngOnInit', '', null);
    }

    getFormData(): void {
      this._gfs.showLog('AddReleasedFunds', 'getFormData', '', null);
      //this.getFundingListReceived();
      //this.getFundingListReleased();
  }
    
    setData(eid: number): void {
        this._gfs.showLog('AddReleasedFunds', 'setData', '', null);
        this.escrowOrderID = eid;    
    }
    
    saveFunds(): void {
        this._gfs.showLog('AddReleasedFunds', 'saveFunds', '', null);
        let dd = this.buildDto();
        this._fs.saveInitialFunding(dd).subscribe({
          next: (resp: any) => {
            this._gfs.showLog('AddReleasedFunds', 'saveFunds', 'Result:', resp);
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
            this._gfs.showLog('AddReleasedFunds', 'saveFunds', 'Error:', err);
            if(err.status == 401){
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
        dd.fundType = 'Released';
        return dd;
    }
    
    getCurrencyCodes(): void {
        this._gfs.showLog('AddReleasedFunds', 'getCurrencyCodes', '', null);
        this._ms.getCurrencyCodes().subscribe({
          next: (orders: any) => {
            this._gfs.showLog('AddReleasedFunds', 'getCurrencyCodes', 'Result:', orders);
            this.currencyCodeList = orders.data;
    
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('AddReleasedFunds', 'getCurrencyCodes', 'Error:', err);
            if(err.status == 401){
              this._ts.signOut();
              this._rtr.navigate(['/sign-in']);
            }
          }
        });
    }

    thecallback(): void { this.getFormData();  }

}