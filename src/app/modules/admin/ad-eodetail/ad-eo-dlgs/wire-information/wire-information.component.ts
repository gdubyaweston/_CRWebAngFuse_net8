import { NgIf, CommonModule } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { AircraftInventoryItem } from "app/modules/_modules/aircraftclasses";
import { EscrowParams, EscrowParticipant } from "app/modules/_modules/escrowclasses";
import { IntListItem, ServiceResponse } from "app/modules/_modules/serviceclasses";
import { AgreementService } from "app/modules/_services/agrinfo.service";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { WiringReport } from "app/modules/_modules/wiringclasses";
import { WiringService } from "app/modules/_services/wireinfo.service";
import { DService } from "app/modules/_services/dlgsvc.service";

@Component({
    selector: 'wire-information',
      standalone: true,
      templateUrl: './wire-information.component.html',
      encapsulation: ViewEncapsulation.None,
      imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatPaginatorModule, MatSortModule, MatTableModule],
})
export class WireInformationComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = 0;
    displayedColumns: string[] = ['playerName', 'playerFirstName', 'cellPhone', 'accountName', 'bankName', 'createdDate', 'verifiedByName', 'verifiedDate', 'wireRequestID', 'end'];
    dataSource: MatTableDataSource<WiringReport>;
    wireList: WiringReport[] = [];
    collectionSize: number = this.wireList.length;

    @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

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
        private _dsfund: DService,) 
    {
        this._gfs.showLog('WireInformation', 'constructor', '', null);
        this._gfs.allowCall = false;
        this.dataSource = new MatTableDataSource(this.wireList);
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('WireInformation', 'ngAfterViewInit', '', null);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    
    ngOnInit(): void {
        this._gfs.showLog('WireInformation', 'ngOnInit', '', null);

        this.getWireInfoList();
    }
    
    setData(eid: number): void {
        this._gfs.showLog('WireInformation', 'setData', '', null);

        this.escrowOrderID = eid;
        
    }

    getWireInfoList(): void {
        this._gfs.showLog('WireInformation', 'getWireInfoList', '', null);

        let epdto = new EscrowParams();
        epdto.escrowOrderID = this.escrowOrderID;

        this._wservice.getWiringList(epdto).subscribe({
            next: (wirelist: any) => {
                this._gfs.showLog('WireInformation', 'getWireInfoList', 'Response:', wirelist);
                this.wireList = wirelist.data;
                this.collectionSize = this.wireList.length;
                this.dataSource = new MatTableDataSource(this.wireList);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;        
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog('WireInformation', 'getWireInfoList', 'Error:', err);
                if(err.status == 401){
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-up']);
                }
            }
        });
    }
   
    openPrintWireInfo(): void {
        alert('print clicked');
        
    }

    thecallback(): void { this.getWireInfoList();  }

    openAddWireInfo(): void {
        this._dsfund.openAddWireInfo('fs-dialog', 'medium', 'medium', this.escrowOrderID, this);
    }

}