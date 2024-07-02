import { CommonModule, NgIf } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';
import { EscrowParams, EscrowParticipant, EscrowRole } from "app/modules/_modules/escrowclasses";
import { MatButtonModule } from '@angular/material/button';
import { StringListItem } from "app/modules/_modules/serviceclasses";
import { AircraftInventoryItem } from "app/modules/_modules/aircraftclasses";
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { FormsModule } from "@angular/forms";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { AddNewComponentComponent } from "../add-new-component/add-new-component.component";
import { EscrowOrderInfoService } from "app/modules/_services/eoinfo.service";

@Component({
  selector: 'update-closing-description',
    standalone: true,
    templateUrl: './update-closing-description.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [NgIf, CommonModule, MatDialogModule, MatButtonModule, MatPaginatorModule, MatSortModule, FormsModule, MatTableModule],
})
export class UpdateClosingDescriptionComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = -1;
    currentDescription: string = '';
    updatedDescription: string = '';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _eois: EscrowOrderInfoService,
        private _acservice: AircraftService,
        private _dialog: MatDialog,
        public _dialogRef: MatDialogRef<UpdateClosingDescriptionComponent>,) 
    {
        this._gfs.showLog('UpdateClosingDescription', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('UpdateClosingDescription', 'ngAfterViewInit', '', null);
        this.getCurrentDescription();
    }
    
    ngOnInit(): void {
        this._gfs.showLog('UpdateClosingDescription', 'ngOnInit', '', null);
    }
    
    setData(eid: number): void {        
        this._gfs.showLog('UpdateClosingDescription', 'setData', '', null);
        this.escrowOrderID = eid;    
    }

    getCurrentDescription(): void {
        this._gfs.showLog('UpdateClosingDescription', 'getCurrentDescription', '', null);

        let ec1 = new EscrowParams();
        ec1.escrowOrderID = this.escrowOrderID;
        ec1.closingDescription = this.currentDescription;

        this._gfs.showLog('UpdateClosingDescription', 'getCurrentDescription', 'ec1:', ec1);
    
        this._eois.getCurrentDescription(ec1).subscribe({
          next: (eslist: any) => {
            this._gfs.showLog('UpdateClosingDescription', 'getCurrentDescription', 'Response:', eslist);
            this.currentDescription = eslist.data;
            this.updatedDescription = eslist.data;
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('UpdateClosingDescription', 'getCurrentDescription', 'Error:', err);
            if(err.status == 401){
              this._ts.signOut();
              this._rtr.navigate(['/sign-in']);
            }
          }
        });
    
    }
    
    updateCurrentDescription(): void {
        this._gfs.showLog('UpdateClosingDescription', 'updateCurrentDescription', '', null);
    
        let ec1 = new EscrowParams();
        ec1.escrowOrderID = this.escrowOrderID;
        ec1.closingDescription = this.updatedDescription;

        this._gfs.showLog('UpdateClosingDescription', 'updateCurrentDescription', 'ec1:', ec1);
    
        this._eois.updateCurrentDescription(ec1).subscribe({
          next: (eslist: any) => {
            this._gfs.showLog('UpdateClosingDescription', 'updateCurrentDescription', 'Response:', eslist);
            this._dialogRef.close();        
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('UpdateClosingDescription', 'updateCurrentDescription', 'Error:', err);
            if(err.status == 401){
              this._ts.signOut();
              this._rtr.navigate(['/sign-in']);
            }
          }
        });
    
    }

}