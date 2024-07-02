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
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { TitleInfoService } from "app/modules/_services/title.service";

@Component({
    selector: 'tsar',
      standalone: true,
      templateUrl: './tsar.component.html',
      encapsulation: ViewEncapsulation.None,
      imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatPaginatorModule, MatSortModule, MatTableModule],
})
export class TSARComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = -1;
    tsOrderID: number = -1;
    invItems: AircraftInventoryItem[] = [];
    eplayers: EscrowParticipant[] = [];
    showData: boolean = false;
    availableList: IntListItem[]=[];
    selectedUser: number = -1;
    checkedEscrow: boolean = false;
    checkedIRSearch: boolean = false;
    checkedIncludeRegistration: boolean = false;
    checkedInclude337: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _tis: TitleInfoService,
        private _acservice: AircraftService,
        public _dialogRef: MatDialogRef<TSARComponent>,) 
    {
        this._gfs.showLog('TSAR', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('TSAR', 'ngAfterViewInit', '', null);
        this.checkedEscrow = true;   
        this.getUserList();     
    }
    
    ngOnInit(): void {
        this._gfs.showLog('TSAR', 'ngOnInit', '', null);
    }

    setData(eid: number, elist: EscrowParticipant[], tsoid: number): void {
        this._gfs.showLog('TSAR', 'setData', '', null);

        this.escrowOrderID = eid;  
        this.eplayers = elist;  
        this.tsOrderID = tsoid;
           
    }

    getUserList(): void {
        this._gfs.showLog('TSAR', 'getUserList', '', null);

        this.availableList = [];
        this.showData = true;
    
        if(this.eplayers != null && this.eplayers.length > 0){
          //this.showData = true;
          this.eplayers.forEach(u => this.availableList.push({ id: u.customerID, name: u.playerName }));
          this.availableList.unshift({id: -1, name: "Make Selection"});
          this.selectedUser = -1;
        }
    
        if(this.tsOrderID > 0){
          this.showData = false;
        }    
    
    }

    submitTSAR(): void {
        this._gfs.showLog('TSAR', 'submitTSAR', '', null);

        let ec1 = new EscrowParams();
        ec1.escrowOrderID = this.escrowOrderID;
        ec1.customerID = this.selectedUser;
        ec1.isEscrow = this.checkedEscrow;
        ec1.isIRSearch = this.checkedIRSearch;
        ec1.isIncludeRegistration = this.checkedIncludeRegistration;
        ec1.isInclude337 = this.checkedInclude337;
       
        this._tis.saveTSAR(ec1).subscribe({
          next: (eslist: any) => {
            this._gfs.showLog('TSAR', 'submitTSAR', 'Response:', eslist);
            if(eslist.data){
              this._dialogRef.close();
            }
            else{
              alert('something went wrong');
            }
                    
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('TSAR', 'submitTSAR', 'Error:', err);
            if(err.status == 401){
                this._ts.signOut();
                this._rtr.navigate(['/sign-in']);
            }
          }
        });
    }

}