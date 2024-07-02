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

@Component({
  selector: 'search-add-to-closing',
    standalone: true,
    templateUrl: './search-add-to-closing.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [NgIf, CommonModule, MatDialogModule, MatButtonModule, MatPaginatorModule, MatSortModule, FormsModule, MatTableModule],
})
export class SearchAddToClosingComponent  {

  _gfs: GlobalFunctionsService = new GlobalFunctionsService();

  escrowOrderID: number = -1;
  availableTypes: StringListItem[] = [];
  selectedObject: string = '';
  selectedNNumber: string = '';
  selectedSerialNumber: string = '';
  selectedMake: string = '';
  selectedModel: string = '';
  showResults: boolean = false;
  showNNumber: boolean = false;
  exactMatch: boolean = false;
  foundResults: AircraftInventoryItem[] = [];
  assignedInventory: StringListItem[] = [];
  disableAddNew: boolean = true;
  disableSearch: boolean = true;
  allowAirframe: boolean = false;
  allowEngine: boolean = false;
  allowProp: boolean = false;
  allowNNumber: boolean = false;
  allowSN: boolean = false;
  allowMake: boolean = false;
  allowModel: boolean = false;
  foundColumns: string[] = ['select', 'ir', 'serialNumber', 'make', 'model', 'nNumber', 'registrationCountry']; 

  //displayedColumns: string[] = ['view', 'escrowOrderID', 'orderStatus', 'orderDate', 'submittedByName', 'escrowDescription', 'participantDisplay', 'end'];
  dataSource: MatTableDataSource<AircraftInventoryItem>;
  daFilterValue: string;
  collectionSize: number = this.foundResults.length;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(
      private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _acservice: AircraftService,
        private _dialog: MatDialog,
    ) {
      this._gfs.showLog('SearchAddToClosing', 'constructor', '', null);
      this._gfs.allowCall = false;
      this.dataSource = new MatTableDataSource(this.foundResults);
    }


  ngAfterViewInit(): void {
    this._gfs.showLog('SearchAddToClosing', 'ngAfterViewInit', '', null);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = this.daFilterValue;
  }

  ngOnInit(): void {
    this._gfs.showLog('SearchAddToClosing', 'ngOnInit', '', null);
    this.getFormData();
  }

  setData(eid: number): void {
    this._gfs.showLog('SearchAddToClosing', 'setData', '', null);
    this.escrowOrderID = eid;    
  }

  getFormData(): void {
    this._gfs.showLog('SearchAddToClosing', 'getFormData', '', null);
    this.getAvailableObjectTypes();
    this.getAssignedInventory();

  }

  getAvailableObjectTypes(): void {
    this._gfs.showLog('SearchAddToClosing', 'getAvailableObjectTypes', '', null);

    let aiidto = new AircraftInventoryItem();
    aiidto.escrowOrderID = this.escrowOrderID;
    
    this._acservice.searchAvailableObjectTypes(aiidto).subscribe({
      next: (response: any) => {
        this._gfs.showLog('SearchAddToClosing', 'getAvailableObjectTypes', 'respone:', response);
        this.availableTypes = response.data;
      },
      error: (err: HttpErrorResponse) => {
        this._gfs.showLog('SearchAddToClosing', 'getAvailableObjectTypes', 'error:', err);
        if(err.status == 401){
          this._ts.signOut();
          this._rtr.navigate(['/sign-in']);
        }
      }
    });

  }

  getAssignedInventory(): void {
    this._gfs.showLog('SearchAddToClosing', 'getAssignedInventory', '', null);

    this.assignedInventory = [];

    let sp = new AircraftInventoryItem();
    sp.escrowOrderID = this.escrowOrderID;
    
    this._acservice.searchAssignedInventory(sp).subscribe({
      next: (response: any) => {
        this._gfs.showLog('SearchAddToClosing', 'getAssignedInventory', 'respone:', response);
        this.assignedInventory = response.data;
        
      },
      error: (err: HttpErrorResponse) => {
        this._gfs.showLog('SearchAddToClosing', 'getAssignedInventory', 'error:', err);
        if(err.status == 401){
          this._ts.signOut();
          this._rtr.navigate(['/sign-in']);;
        }
      }
    });

  }

  objectTypeChange(): void {
    this._gfs.showLog('SearchAddToClosing', 'objectTypeChange', '', null);
    if(this.selectedObject == 'Airframe'){
      this.showNNumber = true;
    }
    else{
      this.showNNumber = false;      
    }
    
    this.checkAllowAddNew();
  }

  

  performReset(): void {
    this._gfs.showLog('SearchAddToClosing', 'performReset', '', null);
    this.selectedObject = '';
    this.selectedNNumber = '';
    this.selectedSerialNumber = '';
    this.selectedMake = '';
    this.selectedModel = '';
    this.getFormData();
    this.checkAllowAddNew();
    this.foundResults = [];
    if(this.foundResults.length > 0){
      this.showResults = true;
    } 
    else{
      this.showResults = false;
      this.collectionSize = this.foundResults.length;
    }   
  }

  performSearch(): void {
    this._gfs.showLog('SearchAddToClosing', 'performSearch', '', null);
    if(this.selectedObject != ''){
      if(this.selectedObject == 'Airframe'){
        this._gfs.showLog('SearchAddToClosing', 'performSearch', 'Airframe', null);
        this.performSearchAircraft();
      }
      else if(this.selectedObject == 'Engine' || this.selectedObject == 'Prop'){
        this._gfs.showLog('SearchAddToClosing', 'performSearch', 'Othr', null);
        this.performSearchEngProp();
      }
      else{
        alert('Please select a valid object type.');
      }
    }
    else{
      alert('Please select an object type.');
    }
  }

  performSearchAircraft(): void {
    this._gfs.showLog('SearchAddToClosing', 'performSearchAircraft', '', null);

    this.foundResults = [];

    let sp = new AircraftInventoryItem();
    sp.escrowOrderID = this.escrowOrderID;
    sp.inventoryObjectType = this.selectedObject;
    sp.nNumber = this.selectedNNumber;
    sp.serialNumber = this.selectedSerialNumber;
    sp.make = this.selectedMake;
    sp.model = this.selectedModel;  
    sp.isExactMatch = this.exactMatch;  

    this._acservice.searchAircraftInventory(sp).subscribe({
      next: (response: any) => {
        this._gfs.showLog('SearchAddToClosing', 'performSearchAircraft', 'response:', response);
        this.foundResults = response.data;
         
        this.collectionSize = this.foundResults.length;
        this.dataSource = new MatTableDataSource(this.foundResults);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = this.daFilterValue;
        if(this.foundResults.length > 0){
          this.showResults = true;
        } 
        else{
          this.showResults = false;
        }   
      },
      error: (err: HttpErrorResponse) => {
        this._gfs.showLog('SearchAddToClosing', 'performSearchAircraft', 'error:', err);
        if(err.status == 401){
          this._ts.signOut();
          this._rtr.navigate(['/sign-in']);;
        }        
      }
    });

  }

  performSearchEngProp(): void {
    this._gfs.showLog('SearchAddToClosing', 'performSearchEngProp', '', null);

    this.foundResults = [];

    let sp = new AircraftInventoryItem();
    sp.escrowOrderID = this.escrowOrderID;
    sp.inventoryObjectType = this.selectedObject;
    sp.nNumber = '';
    sp.serialNumber = this.selectedSerialNumber;
    sp.make = this.selectedMake;
    sp.model = this.selectedModel; 
    sp.isExactMatch = this.exactMatch;   

    this._acservice.searchAircraftInventory(sp).subscribe({
      next: (response: any) => {
        this._gfs.showLog('SearchAddToClosing', 'performSearchEngProp', 'response:', response);
        this.foundResults = response.data;
        
        this.collectionSize = this.foundResults.length;
        this.dataSource = new MatTableDataSource(this.foundResults);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = this.daFilterValue;    
        if(this.foundResults.length > 0){
          this.showResults = true;
        } 
        else{
          this.showResults = false;
        }   
      },
      error: (err: HttpErrorResponse) => {
        this._gfs.showLog('SearchAddToClosing', 'performSearchEngProp', 'error:', err);
        if(err.status == 401){
          this._ts.signOut();
          this._rtr.navigate(['/sign-in']);;
        }
      }
    });

  }

  checkAllowAddNew(): void {
    this._gfs.showLog('SearchAddToClosing', 'checkAllowAddNew', '', null);
    if((this.showNNumber && this.selectedNNumber.length > 0) && this.selectedSerialNumber.length > 0 && this.selectedSerialNumber.length > 0 && this.selectedModel.length > 0 && this.selectedObject.length > 0)
    {
      this.disableAddNew = false;
    }
    else if(this.selectedSerialNumber.length > 0 && this.selectedSerialNumber.length > 0 && this.selectedModel.length > 0 && this.selectedObject.length > 0)
    {
      this.disableAddNew = false;
    }
    else
    {
      this.disableAddNew = true;
    }

    if(this.allowAddToClosing()){
      this.disableSearch = false;
    }
    else {
      this.disableSearch = true;
    }

    /*
    if(!this.allowAddToClosing()){
      this.disableSearch = false;
    }
    else {
      this.disableSearch = true;
    }
    */

    
  }

  allowAddToClosing(): boolean {
    if(this.selectedObject == 'Airframe' || this.selectedObject == 'Engine' || this.selectedObject == 'Prop'){
      if((this.selectedSerialNumber.length > 0) || (this.selectedMake.length > 0) || (this.selectedModel.length > 0) || (this.selectedObject == 'Airframe' && this.showNNumber && this.selectedNNumber.length > 0)){
        return true;
      }
      else {
        return false;
      }
      /*
      if(){
        if(){
          return true;
        }
      }
      if(){
        return true;
      }

      if(){
        return true;
      }

      if(){
        return true;
      }
      */      
    }
    else{
      return false;
    }
    
  }

  private dlgWidth(dlgSize: string): string {
    if(dlgSize === 'xsmall'){
      return '45';
    }
    else if(dlgSize === 'small'){
      return '70';
    }
    else if(dlgSize === 'medium'){
      return '80';
    }
    else if(dlgSize === 'large'){
      return '90';
    }
    else if(dlgSize === 'xlarge'){
      return '95';
    }
    else{
      return '80';
    }
  }

  private dlgHeight(dlgSize: string): string {
    if(dlgSize === 'xsmall'){
      return '45';
    }
    else if(dlgSize === 'small'){
      return '70';
    }
    else if(dlgSize === 'medium'){
      return '80';
    }
    else if(dlgSize === 'large'){
      return '90';
    }
    else if(dlgSize === 'xlarge'){
      return '95';
    }
    else{
      return '80';
    }
  }

  performAddNew(): void {
    this._gfs.showLog('SearchAddToClosing', 'performAddNew', '', null);
    this.openAddNewComponent(true, true, 'fs-dialog', 'xsmall');//xsmall
    
  }

  openAddNewComponent(af: boolean, dc: boolean, pnlClass: string, dlgSize: string): void {
    this._gfs.showLog('SearchAddToClosing', 'openAddNewComponent', '', null);

    var w = this.dlgWidth(dlgSize);
    var h = this.dlgHeight(dlgSize);

    const dr = this._dialog.open(AddNewComponentComponent, {
      autoFocus: af,
      disableClose: dc,
      panelClass: pnlClass,
      width: w + '%',
      height: h + '%'
    });
    
    dr.componentInstance.setData(this.escrowOrderID, this.selectedObject, this.selectedNNumber, this.selectedSerialNumber, this.selectedModel, this.selectedMake);
    
    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dr.afterClosed().subscribe(() => this.getFormData() );

  }  

  addItem(aii: AircraftInventoryItem): void{
    this._gfs.showLog('SearchAddToClosing', 'addItem', '', null);   

    this._acservice.submitAircraftInventory(aii).subscribe({
      next: (response: any) => {
        this._gfs.showLog('SearchAddToClosing', 'addItem', 'response:', response);
        
        this.performReset();
        this.foundResults = [];
        this.collectionSize = this.foundResults.length;
        this.dataSource = new MatTableDataSource(this.foundResults);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = this.daFilterValue;    
        if(this.foundResults.length > 0){
          this.showResults = true;
        } 
        else{
          this.showResults = false;
        }   
      },
      error: (err: HttpErrorResponse) => {
        this._gfs.showLog('SearchAddToClosing', 'addItem', 'error:', err);
        if(err.status == 401){
          this._ts.signOut();
          this._rtr.navigate(['/sign-in']);;
        }
      }
    });    

  }

  

}
