import { NgIf, CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
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
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { FundingService } from "app/modules/_services/fundinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { MiscService } from "app/modules/_services/miscinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";


@Component({
    selector: 'send-fx-agreement',
      standalone: true,
      templateUrl: './send-fx-agreement.component.html',
      encapsulation: ViewEncapsulation.None,
      imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, 
        MatPaginatorModule, MatSortModule, MatTableModule, MatDatepickerModule, 
        MatFormFieldModule, ],
})
export class SendFXAgreementComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

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
            public _dialogRef: MatDialogRef<SendFXAgreementComponent>,
    ) 
    {        
        this._gfs.showLog('SendFXAgreement', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('SendFXAgreement', 'ngAfterViewInit', '', null);
    }
    
    ngOnInit(): void {
        this._gfs.showLog('SendFXAgreement', 'ngOnInit', '', null);
    }

    setData(eid: number): void {
        this._gfs.showLog('SendFXAgreement', 'setData', '', null);
    }

}
