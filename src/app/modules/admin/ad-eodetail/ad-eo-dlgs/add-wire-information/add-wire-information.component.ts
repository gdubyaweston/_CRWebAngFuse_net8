import { NgIf, CommonModule } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { WiringInformation } from "app/modules/_modules/wiringclasses";
import { AgreementService } from "app/modules/_services/agrinfo.service";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { WiringService } from "app/modules/_services/wireinfo.service";

@Component({
    selector: 'add-wire-information',
      standalone: true,
      templateUrl: './add-wire-information.component.html',
      encapsulation: ViewEncapsulation.None,
      imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatPaginatorModule, MatSortModule, MatTableModule],
})
export class AddWireInformationComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = 0;
    participantName: string = '';
    bankName: string = '';
    abaRouting: string = '';
    accountName: string = '';
    accountNumber: string = '';
    swiftCode: string = '';
    reference: string = '';
    beneficiaryAddress: string = '';
    instructions: string = '';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _acservice: AircraftService,
        private _agservice: AgreementService,
        private _wservice: WiringService,
        private _dialog: MatDialog,
        public _dialogRef: MatDialogRef<AddWireInformationComponent>) 
    {
        this._gfs.showLog('AddWireInformation', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngOnInit(): void {
        this._gfs.showLog('AddWireInformation', 'ngOnInit', '', null);
    }
  
    setData(eid: number): void {
        this._gfs.showLog('AddWireInformation', 'setData', '', null);
        this.escrowOrderID = eid;      
    }

    saveWiringInfo(): void {
        this._gfs.showLog('AddWireInformation', 'saveWiringInfo', '', null);
        
        var wi = this.createWireInformation();
        this._wservice.saveWiringInformation(wi).subscribe({
          next: (result: any) => {
            this._gfs.showLog('AddWireInformation', 'saveWiringInfo', 'Response:', result);
            if(result.success){
                this._dialogRef.close();
            }
            else{
                if(result.message !== '')
                    alert(result.message);
                else
                    alert('Fail Fail');
            } 
                    
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('AddWireInformation', 'saveWiringInfo', 'Error:', err);
            if (err.status == 401) {
              this._ts.signOut();
              this._rtr.navigate(['/sign-up']);
            }
          },
       });
        
    }

    createWireInformation(): WiringInformation {
        var wi = new WiringInformation();
        wi.escrowOrderID = this.escrowOrderID; 
        wi.wireID = -1; 
        wi.wireRequestID = -1;
        wi.verifiedBy = -1, 
        wi.wireRequestOpenedID = -1,   
        wi.playerName = this.participantName;
        wi.accountName = this.accountName;
        wi.accountNumber = this.accountNumber; 
        wi.aba = this.abaRouting;
        wi.bankName = this.bankName;
        wi.address = this.beneficiaryAddress;
        wi.swiftCode = this.swiftCode;
        wi.reference = this.reference;
        wi.notes = this.instructions;
        wi.createdDate = '';
        wi.verifiedDate = '';
        wi.email = '';
        wi.cell = '';
        return wi;
      }

}
