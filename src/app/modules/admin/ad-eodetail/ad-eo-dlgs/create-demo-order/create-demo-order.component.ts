import { CommonModule, NgIf } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { EscrowOrderInfoService } from "app/modules/_services/eoinfo.service";
import { EscrowParams, EscrowParticipant, EscrowRole } from "app/modules/_modules/escrowclasses";
import { MatButtonModule } from '@angular/material/button';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector: 'create-demo-order',
    standalone: true,
    templateUrl: './create-demo-order.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [NgIf, CommonModule, MatDialogModule, MatButtonModule],
})
export class CreateDemoOrderComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = 0;    
    
    message: string = 'Create Demo Copy Of This Closing..';
    cancelMessage: string = 'Cancel';
    continueMessage: string = "Continue &nbsp; <i class='fa fa-arrow-circle-right'></i>";
    showStartCopy: boolean = true;
    showEndCopy: boolean = false;
    copyMessage: string = "";
    gotoCopyMessage: string = "Goto Copy &nbsp; <i class='fa fa-arrow-circle-right'></i>";
    newEscrowOrderID: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _eos: EscrowOrderInfoService,
        private _dialog: MatDialog,
        ) 
    {
        this._gfs.showLog('CreateDemoOrder', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngOnInit(): void {
        this._gfs.showLog('CreateDemoOrder', 'ngOnInit', '', null);
        this.newEscrowOrderID = '-1';
    }

    setData(eid: number): void {
        this._gfs.showLog('CreateDemoOrder', 'setData', '', null);
        this.escrowOrderID = eid; 
          
    }    

    continueCreation(): void {
        this._gfs.showLog('CreateDemoOrder', 'continueCreation', '', null);
        // call backend to create the copy
        var par = new EscrowParams();
        par.escrowOrderID = this.escrowOrderID;
        this._eos.demoEscrow(par).subscribe({
          next: (result: any) => {
            if(result.success && result.data.newEscrowOrderID > 0){
                this._gfs.showLog('CreateDemoOrder', 'continueCreation', 'Return Success:', result);
                this.showStartCopy = false;
                this.showEndCopy = true;
                this.newEscrowOrderID = result.data.newEscrowOrderID.toString();
                this.message = 'New Demo Closing Has Been Created..';
                this.copyMessage = "Copy Created Escrow Order: " + result.data.newEscrowOrderID;
            }
            else{
                this._gfs.showLog('CreateDemoOrder', 'continueCreation', 'Return Failure:', result);
                this.copyMessage = 'COPY FAILED!!';
                this.showStartCopy = false;
                this.showEndCopy = false;
            }                     
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('CreateDemoOrder', 'continueCreation', 'Error:', err);
            if (err.status == 401) {
                this._ts.signOut();
                this._rtr.navigate(['/sign-in']);
            }
          },
       });
    }
    
    gotoCopy(): void {
        this._gfs.showLog('CreateDemoOrder', 'gotoCopy', '', null);
        this._dialog.closeAll();
        if(this.newEscrowOrderID != '0')
          window.open('/ad-eodetail/' + this.newEscrowOrderID, '_blank');
    }   

}