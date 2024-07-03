import { NgIf, CommonModule } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { AircraftInventoryItem } from "app/modules/_modules/aircraftclasses";
import { EscrowParams, EscrowParticipant, EscrowRole } from "app/modules/_modules/escrowclasses";
import { IntListItem, ServiceResponse, StringListItem } from "app/modules/_modules/serviceclasses";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";

@Component({
    selector: 'participant-search-results',
      standalone: true,
      templateUrl: './participant-search-results.component.html',
      encapsulation: ViewEncapsulation.None,
      imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatPaginatorModule, MatSortModule, MatTableModule],
})
export class ParticipantSearchResultsComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    participantList: EscrowParticipant[];

    displayedColumns: string[] = ['select', 'displayName', 'company', 'email', 'businessPhone', 'address', 'city', 'state', 'postal', 'end'];
    dataSource: MatTableDataSource<EscrowParticipant>;
    daFilterValue: string;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _acservice: AircraftService,
        public _dialogRef: MatDialogRef<ParticipantSearchResultsComponent>,) 
    {
        this._gfs.showLog('ParticipantSearchResults', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('ParticipantSearchResults', 'ngAfterViewInit', '', null);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = this.daFilterValue;
    }
      
    ngOnDestroy(): void {
        this._gfs.showLog('ParticipantSearchResults', 'ngOnDestroy', '', null);        
    }
    
    ngOnInit(): void {
        this._gfs.showLog('ParticipantSearchResults', 'ngOnInit', '', null);
    }
    
    setParticipants(data: EscrowParticipant[]): void {
        this._gfs.showLog('ParticipantSearchResults', 'setParticipants', '', null);

        this.participantList = data;
        this.dataSource = new MatTableDataSource(this.participantList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = this.daFilterValue;
    }
    
    selectParticipant(data: EscrowParticipant): void {
        this._gfs.showLog('ParticipantSearchResults', 'selectParticipant', '', null);

        //console.log(data);
        this._dialogRef.close({ data: data });
    }
    
    applyParticipantFilter(event: Event) {
        this._gfs.showLog('ParticipantSearchResults', 'applyParticipantFilter', '', null);

        this.daFilterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = this.daFilterValue; /// filterValue.trim().toLowerCase();
        
    }

}