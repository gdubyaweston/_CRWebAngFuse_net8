import { NgIf, CommonModule } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { AircraftInventoryItem } from "app/modules/_modules/aircraftclasses";
import { EscrowParams, EscrowParticipant } from "app/modules/_modules/escrowclasses";
import { IntListItem, ServiceResponse } from "app/modules/_modules/serviceclasses";
import { AgreementService } from "app/modules/_services/agrinfo.service";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";

@Component({
    selector: 'view-latest-fxagreement',
      standalone: true,
      templateUrl: './view-latest-fxagreement.component.html',
      encapsulation: ViewEncapsulation.None,
      imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatPaginatorModule, MatSortModule, MatTableModule],
})
export class ViewLatestFXAgreementComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    agreementID: number = 0;
    agreementText: string = '<b>No agreement text found</b><br><b>No agreement text found</b><br><b>No agreement text found</b><br><b>No agreement text found</b><br>';
    agreementType: string = 'Unknown';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _acservice: AircraftService,
        private _agservice: AgreementService,) 
    {
        this._gfs.showLog('ViewLatestFXAgreement', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngOnInit(): void {
        this._gfs.showLog('ViewLatestFXAgreement', 'ngOnInit', '', null);

    }
  
    ngAfterViewInit(): void {
        this._gfs.showLog('ViewLatestFXAgreement', 'ngAfterViewInit', '', null);
        this.viewAgreement();
    }
  
    setData(aid: number): void {
        this._gfs.showLog('ViewLatestFXAgreement', 'setData', '', null);
        this.agreementID = aid;    
    }

    viewAgreement(): void {
        this._gfs.showLog('ViewLatestFXAgreement', 'viewAgreement', '', null);

        if(this.agreementID > 0){
            var epdto = new EscrowParams();
            epdto.agreementID = this.agreementID;
            
            this._agservice.getAgreementInfo(epdto).subscribe({
              next: (ret: any) => {
                this._gfs.showLog('ViewLatestFXAgreement', 'viewAgreement', 'Return:', ret);
                if(ret.success){
                  this.agreementType = ret.data.agreementType;
                  this.agreementText = ret.data.htmlText;
                }
                else{
                  alert(ret.message);
                }
                          
              },
              error: (err: HttpErrorResponse) => {
                this._gfs.showLog('ViewLatestFXAgreement', 'viewAgreement', 'Error:', err);
                if(err.status == 401){
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }
              }
            });
      
        }
    }

}