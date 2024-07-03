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
import { EscrowOrder, EscrowParams } from "app/modules/_modules/escrowclasses";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { FundingService } from "app/modules/_services/fundinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { MiscService } from "app/modules/_services/miscinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { EscrowOrderInfoService } from "app/modules/_services/eoinfo.service";

@Component({
    selector: 'linked-orders',
      standalone: true,
      templateUrl: './linked-orders.component.html',
      encapsulation: ViewEncapsulation.None,
      imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, 
        MatPaginatorModule, MatSortModule, MatTableModule, MatDatepickerModule, 
        MatFormFieldModule, ],
})
export class LinkedOrdersComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number;
    orders: Array<EscrowOrder>;

    constructor(
        private _activatedRoute: ActivatedRoute,
            private _authService: AuthService,
            private _httpClient: HttpClient,
            private _rtr: Router,
            private _ts: TokenStorageService,
            private _eois: EscrowOrderInfoService,
            private _acservice: AircraftService,
            private _ms: MiscService,
            private _fs: FundingService,
            private _dialog: MatDialog,
            public _dialogRef: MatDialogRef<LinkedOrdersComponent>,
    ) 
    {        
        this._gfs.showLog('LinkedOrders', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('LinkedOrders', 'ngAfterViewInit', '', null);
        this.viewLinkedOrders();
    }
    
    ngOnInit(): void {
        this._gfs.showLog('LinkedOrders', 'ngOnInit', '', null);
    }
    
    setData(eid: number): void {
        this._gfs.showLog('LinkedOrders', 'setData', '', null);
        this.escrowOrderID = eid;    
    }
    
    openEscrowOrder(eid: number): void {
        this._gfs.showLog('LinkedOrders', 'openEscrowOrder', '', null);
        if(eid > 0){
          window.open('/ad-eodetail/' + eid, '_blank');
        }
    }

    viewLinkedOrders(): void {
        this._gfs.showLog('LinkedOrders', 'viewLinkedOrders', '', null);
        if(this.escrowOrderID > 0){
                      
            var epdto = new EscrowParams();
            epdto.escrowOrderID = this.escrowOrderID;
            epdto.departmentName = 'Escrow';
          
            this._eois.getLinkedOrders(epdto).subscribe({
                next: (ret: any) => {
                    this._gfs.showLog('LinkedOrders', 'viewLinkedOrders', 'Response:', ret);
                    if(ret.success){
                        this.orders = ret.data;
                    }
                    else{
                        alert(ret.message);
                    }
                        
                },
                error: (err: HttpErrorResponse) => {
                    this._gfs.showLog('LinkedOrders', 'viewLinkedOrders', 'Error:', err);
                    if(err.status == 401){
                        this._ts.signOut();
                        this._rtr.navigate(['/sign-in']);
                    }
                }
          });
        }
    }

}