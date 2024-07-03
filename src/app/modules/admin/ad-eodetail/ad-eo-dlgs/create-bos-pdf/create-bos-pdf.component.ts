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
import { EscrowParams, BosPdf, AraPdf, PoiPdf } from "app/modules/_modules/escrowclasses";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { FundingService } from "app/modules/_services/fundinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { MiscService } from "app/modules/_services/miscinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { PDFInfoService } from "app/modules/_services/pdfinfo.service";


@Component({
    selector: 'create-bos-pdf',
        standalone: true,
        templateUrl: './create-bos-pdf.component.html',
        encapsulation: ViewEncapsulation.None,
        imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatPaginatorModule, 
            MatSortModule, MatTableModule, MatDatepickerModule, MatFormFieldModule],
})
export class CreateBosPdfComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = 0;

    orders: BosPdf[] = [];
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
            public _dialogRef: MatDialogRef<CreateBosPdfComponent>,
    ) 
    {        
        this._gfs.showLog('CreateBosPdf', 'constructor', '', null);
        //this._gfs.allowCall = false;
        //this.populateForm();
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('CreateBosPdf', 'ngAfterViewInit', '', null);
    }
    
    ngOnInit(): void {
        this._gfs.showLog('CreateBosPdf', 'ngOnInit', '', null);

        this.populateForm();
    }

    setData(eid: number): void {
        this._gfs.showLog('CreateBosPdf', 'setData', '', null);
        this.escrowOrderID = eid;
    }

    populateForm(): void {
        this._gfs.showLog('CreateBosPdf', 'populateForm', '', null);

        this.orderCount = 0;

        var epdto = new EscrowParams();
            epdto.escrowOrderID = this.escrowOrderID;
            
        this._pdf.createBosPdf(epdto).subscribe({
            next: (ret: any) => {
                this._gfs.showLog('CreateBosPdf', 'populateForm', 'Response:', ret);
                if(ret.success){
                    this.orders = ret.data;
                    this.orderCount = this.orders.length;
                }
                else{
                    alert(ret.message);
                }
                                    
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog('CreateBosPdf', 'populateForm', 'Error:', err);
                if(err.status == 401){
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }
            }
        });

        

    }

    /*
    var escrowOrderId = Convert.ToInt32(qsGet["eoId"]);
                var tt = (from ei in db.tblEscrowInvItems
                          join inv in db.tblAircraftInventories
                              on ei.AircraftInvID equals inv.ItemID
                          where ei.EscrowOrderID == escrowOrderId && inv.InvObjType == "Airframe"
                          select new
                          {
                              inv.InvObjType,
                              inv.Nnumber,
                              inv.Make,
                              inv.Model,
                              inv.SN
                          }).ToList();
    */

}
