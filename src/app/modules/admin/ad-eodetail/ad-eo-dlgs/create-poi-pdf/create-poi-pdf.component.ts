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
import { EscrowParams, PoiPdf } from "app/modules/_modules/escrowclasses";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { FundingService } from "app/modules/_services/fundinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { MiscService } from "app/modules/_services/miscinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { PDFInfoService } from "app/modules/_services/pdfinfo.service";


@Component({
    selector: 'create-poi-pdf',
        standalone: true,
        templateUrl: './create-poi-pdf.component.html',
        encapsulation: ViewEncapsulation.None,
        imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatPaginatorModule, 
            MatSortModule, MatTableModule, MatDatepickerModule, MatFormFieldModule],
})
export class CreatePoiPdfComponent {
    
    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = 0;

    orders: PoiPdf[] = [];
    orderCount: number = 0;

    constructor(
        private _activatedRoute: ActivatedRoute,
            private _authService: AuthService,
            private _httpClient: HttpClient,
            private _rtr: Router,
            private _ts: TokenStorageService,
            private _pdf: PDFInfoService,
            private _acservice: AircraftService,
            private _ms: MiscService,
            private _fs: FundingService,
            private _dialog: MatDialog,
            public _dialogRef: MatDialogRef<CreatePoiPdfComponent>,
    ) 
    {        
        this._gfs.showLog('CreatePoiPdf', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('CreatePoiPdf', 'ngAfterViewInit', '', null);
    }
    
    ngOnInit(): void {
        this._gfs.showLog('CreatePoiPdf', 'ngOnInit', '', null);

        this.populateForm();
    }

    setData(eid: number): void {
        this._gfs.showLog('CreatePoiPdf', 'setData', '', null);
        this.escrowOrderID = eid; 
          
    }

    populateForm(): void {
        this._gfs.showLog('CreatePoiPdf', 'populateForm', '', null);

        this.orderCount = 0;

        var epdto = new EscrowParams();
            epdto.escrowOrderID = this.escrowOrderID;
            
        this._pdf.createPoiPdf(epdto).subscribe({
            next: (ret: any) => {
                this._gfs.showLog('CreatePoiPdf', 'populateForm', 'Response:', ret);
                if(ret.success){
                    this.orders = ret.data;
                    this.orderCount = this.orders.length;
                }
                else{
                    alert(ret.message);
                }
                                    
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog('CreatePoiPdf', 'populateForm', 'Error:', err);
                if(err.status == 401){
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }
            }
        });

        

    }
    

}