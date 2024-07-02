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
    selector: 'title-search',
      standalone: true,
      templateUrl: './title-search.component.html',
      encapsulation: ViewEncapsulation.None,
      imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatPaginatorModule, MatSortModule, MatTableModule],
})
export class TitleSearchComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = -1;
    tsOrderID: number = -1;
    invItems: AircraftInventoryItem[] = [];
    eplayers: EscrowParticipant[] = [];
    showData: boolean = false;
    availableList: IntListItem[]=[];
    selectedUser: number = -1;
    checkedEngine: boolean = false;
    checkedProp: boolean = false;
    checkedPEngine: boolean = false;
    checkedPAirframe: boolean = false;
    hideAll_TS: boolean = false;
    hideAll_TSIR: boolean = false;
    hideEng_TS: boolean = false;
    hideEng_TSIR: boolean = false;
    hideProp_TS: boolean = false;
    hideAF_TSIR: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _tis: TitleInfoService,
        private _acservice: AircraftService,
        public _dialogRef: MatDialogRef<TitleSearchComponent>,) 
    {
        this._gfs.showLog('TitleSearch', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('TitleSearch', 'ngAfterViewInit', '', null);
        this.getUserList();
    }
    
    ngOnInit(): void {
        this._gfs.showLog('TitleSearch', 'ngOnInit', '', null);
    }
    
    setData(eid: number, elist: EscrowParticipant[], ilist: AircraftInventoryItem[], tsoid: number): void {
        this._gfs.showLog('TitleSearch', 'setData', '', null);

        this.escrowOrderID = eid;  
        this.eplayers = elist;  
        this.invItems = ilist;
        this.tsOrderID = tsoid;       
        
    }

    submitTitleSearch(): void {
        this._gfs.showLog('TitleSearch', 'submitTitleSearch', '', null);
    
        let ec1 = new EscrowParams();
        ec1.escrowOrderID = this.escrowOrderID;
        ec1.customerID = this.selectedUser;
        ec1.useEngines = this.checkedEngine;
        ec1.useProps = this.checkedProp;
        ec1.iraf = this.checkedPAirframe;
        ec1.irEngine = this.checkedPEngine;
       
        this._tis.saveTitleSearch(ec1).subscribe({
          next: (eslist: any) => {
            console.log(eslist);
            if(eslist.data){
              this._dialogRef.close();
            }
            else{
              alert('something went wrong');
            }        
          },
          error: (err: HttpErrorResponse) => {
            console.log('Got Error(Submit Title Search)');
            console.log(err);
            if(err.status == 401){
              this._ts.signOut();
              this._rtr.navigate(['/sign-in']);
            }
          }
        });
        /*
        saveTitleSearch(route: string, body: EscrowParamsDto): Observable<ServiceResponse<boolean>>{
        return this.http.post<ServiceResponse<boolean>>(this.createRoute(route, this.envURL.urlAddress), body);
      }
        */
    }
    
    getUserList(): void {
        this._gfs.showLog('TitleSearch', 'getUserList', '', null);

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
        
        this.resetDisplayFlags();
        
        if(this.invItems == null || this.invItems.length < 1){
          this.hideAll_TS = true;
          this.hideAll_TSIR = true;
          this.hideEng_TS = true;
          this.hideEng_TSIR = true;
          this.hideProp_TS = true;
          this.hideAF_TSIR = true;
        }
        else{
          if(this.invItems.filter(t => t.inventoryObjectType == 'Airframe').length < 1){
            this.hideAF_TSIR = true;
          }
          if(this.invItems.filter(t => t.inventoryObjectType == 'Engine').length < 1){
            this.hideEng_TS = true;
            this.hideEng_TSIR = true;
          }
          if(this.invItems.filter(t => t.inventoryObjectType == 'Prop').length < 1){
            this.hideProp_TS = true;
          }
          if (this.hideAF_TSIR && this.hideEng_TSIR)
            this.hideAll_TSIR = true;
          if (this.hideEng_TS && this.hideProp_TS)
            this.hideAll_TS = true;
        }
    
        //this.displayFlags();
    
    }
    
    resetDisplayFlags(): void {
        this._gfs.showLog('TitleSearch', 'resetDisplayFlags', '', null);

        this.hideAll_TS = false;
        this.hideAll_TSIR = false;
        this.hideEng_TS = false;
        this.hideEng_TSIR = false;
        this.hideProp_TS = false;
        this.hideAF_TSIR = false;
    }
    
    displayFlags(): void {
        this._gfs.showLog('TitleSearch', 'displayFlags', '', null);

        console.log('Display/Hide Flags:');
        console.log('HideAll_TS: ' + this.hideAll_TS);
        console.log('HideAll_TSIR: ' + this.hideAll_TSIR);
        console.log('HideEng_TS: ' + this.hideEng_TS);
        console.log('HideEng_TSIR: ' + this.hideEng_TSIR);
        console.log('HideProp_TS: ' + this.hideProp_TS);
        console.log('HideAF_TSIR: ' + this.hideAF_TSIR);
        console.log('ShowData: ' + this.showData);
    }

}