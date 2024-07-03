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
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { FundingService } from "app/modules/_services/fundinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { MiscService } from "app/modules/_services/miscinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { StringListItem } from "app/modules/_modules/serviceclasses";
import { EscrowParams } from "app/modules/_modules/escrowclasses";
import { MatAccordion, MatExpansionModule } from "@angular/material/expansion";
import { ParticipantInfoService } from "app/modules/_services/parinfo.service";

@Component({
    selector: 'create-closing-statement',
        standalone: true,
        templateUrl: './create-closing-statement.component.html',
        encapsulation: ViewEncapsulation.None,
        imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatPaginatorModule, 
            MatSortModule, MatTableModule, MatDatepickerModule, MatFormFieldModule, MatExpansionModule],
})
export class CreateClosingStatementComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = -1;
    availableParticipants: StringListItem[] = [];
    selectedParticipant: string = '';
    disablePerformCreateStatement: boolean = true;

    hasReleasedFunds: boolean = false;
    hasReceivedFunds: boolean = false;
    _dservice: any;

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
            public _dialogRef: MatDialogRef<CreateClosingStatementComponent>,
    ) 
    {        
        this._gfs.showLog('CreateClosingStatement', 'constructor', '', null);
        //
        //this._gfs.allowCall = false;
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('CreateClosingStatement', 'ngAfterViewInit', '', null);
    }
    
    ngOnInit(): void {
        this._gfs.showLog('CreateClosingStatement', 'ngOnInit', '', null);
        this.retrieveParticipants(); 
    }

    getFormData(): void {
        this._gfs.showLog('CreateClosingStatement', 'getFormData', '', null);
        //this.getFundingListReceived();
        //this.getFundingListReleased();
    }

    setData(eid: number): void {
        this._gfs.showLog('CreateClosingStatement', 'setData', '', null);
        this.escrowOrderID = eid; 
          
    }

    retrieveParticipants(): void {
        this._gfs.showLog('CreateClosingStatement', 'retrieveParticipants', '', null);

        alert('Hello');

        this.availableParticipants = [];

        let epdto = new EscrowParams();
        epdto.escrowOrderID = this.escrowOrderID;

        this._par.retrievePartipants(epdto).subscribe({
            next: (response: any) => {
                this._gfs.showLog('CreateClosingStatement', 'retrieveParticipants', 'Response:', response);
                if(response && response.data){
                    this.availableParticipants = response.data;
                }
                else{
                    alert('Unable to load participants.');
                }
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog('CreateClosingStatement', 'retrieveParticipants', 'Error:', err);
                if(err.status == 401){
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }
            }
        });
       

    }

    performCreateStatement(): void {
        this._gfs.showLog('CreateClosingStatement', 'performCreateStatement', '', null);
    }
   
    thecallback(): void { this.getFormData();  }

    openAddReceivedFunds(): void {
        this._dservice.openAddReceivedFunds_CCS('fs-dialog', 'medium', 'small', this.escrowOrderID, this);    
    }
      
    openAddReleasedFunds(): void {
        this._dservice.openAddReleasedFunds_CCS('fs-dialog', 'medium', 'small', this.escrowOrderID, this);
    }

}
