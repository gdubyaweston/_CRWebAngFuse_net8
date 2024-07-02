import { NgIf, CommonModule } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { EscrowParticipant, EscrowRole } from "app/modules/_modules/escrowclasses";
import { SearchParameters, StringListItem } from "app/modules/_modules/serviceclasses";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { FundingService } from "app/modules/_services/fundinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { MiscService } from "app/modules/_services/miscinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { ParticipantInfoService } from "app/modules/_services/parinfo.service";



@Component({
    selector: 'ap-address',
      standalone: true,
      templateUrl: './ap-address.component.html',
      encapsulation: ViewEncapsulation.None,
      imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, 
        MatPaginatorModule, MatSortModule, MatTableModule, MatDatepickerModule, 
        MatFormFieldModule, NgxMaskDirective,  ],
      providers: [provideNgxMask()],
})
export class APAddressComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    customerData: EscrowParticipant;

    constructor(
        private _activatedRoute: ActivatedRoute,
            private _authService: AuthService,
            private _httpClient: HttpClient,
            private _rtr: Router,
            private _ts: TokenStorageService,
            private _par: ParticipantInfoService,
            private _acservice: AircraftService,
            private _ms: MiscService,
            private _fs: FundingService,
            private _dialog: MatDialog,
            public _dialogRef: MatDialogRef<APAddressComponent>,
    ) 
    {        
        this._gfs.showLog('APAddressComponent', 'constructor', '', null);
        //this._gfs.allowCall = false;
    }

    ngAfterViewInit(): void {
      this._gfs.showLog('APAddressComponent', 'ngAfterViewInit', '', null);
    }
  
    ngOnInit(): void {
      this._gfs.showLog('APAddressComponent', 'ngOnInit', '', null);
      
    }

    setData(epData: EscrowParticipant): void {
        this.customerData = epData;
    }

    saveAddresses(): void {
        if(this.customerData !== null){
            alert('Save data');

            this._par.saveParticipant(this.setCustomerData(this.customerData)).subscribe({
              next: (result: any) => {
                this._gfs.showLog('APAddressComponent', 'saveAddresses', 'Response:', result);
                if(result.success){
                  alert('Save Address Success!!');
                  this._dialogRef.close();
                }
                else{
                  alert('Save Address Failure!!');
                  alert(result.message);
                } 
              },
              error: (err: HttpErrorResponse) => { 
                  this._gfs.showLog('APAddressComponent', 'saveAddresses', 'Error:', err);               
                  if (err.status == 401) {
                      this._ts.signOut();
                      this._rtr.navigate(['/sign-up']);
                  }
              }
            });
        }
    }

    setCustomerData(ep: EscrowParticipant): EscrowParticipant {
      this._gfs.showLog('APAddressComponent', 'setCustomerData', 'EP:', ep);
      var rdata = new EscrowParticipant();
      if(ep && ep.customerID > 0 && ep.participantID > 0)
      {
        rdata.customerID = ep.customerID;
        rdata.participantID = ep.participantID;
        rdata.escrowOrderID = ep.escrowOrderID;
        rdata.roleID = ep.roleID;

        rdata.address2 = (ep.address2 != null && ep.address2.length > 0) ? ep.address2 : '';
        rdata.address3 = (ep.address3 != null && ep.address3.length > 0) ? ep.address3 : '';
        
        
      }      

      return rdata;
    }

    thecallback(): void { }
    
}