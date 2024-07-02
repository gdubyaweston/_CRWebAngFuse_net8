import { CommonModule, NgIf } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { AircraftInventoryItem } from "app/modules/_modules/aircraftclasses";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";

@Component({
    selector: 'add-new-component',
      standalone: true,
      templateUrl: './add-new-component.component.html',
      encapsulation: ViewEncapsulation.None,
      imports: [NgIf, CommonModule, FormsModule],
  })
  export class AddNewComponentComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number;
    objectType: string;
    nnumber: string;
    serialNumber: string;
    model: string;
    make: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _acservice: AircraftService,
        private _dialog: MatDialog,
        private _dialogRef: MatDialogRef<AddNewComponentComponent>,
    ){
        this._gfs.showLog('AddNewComponentComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngOnInit(): void {
        this._gfs.showLog('AddNewComponentComponent', 'ngOnInit', '', null);    
    }
  
    setData(eid: number, otype: string, nn: string, sn: string, md: string, mk: string): void {
        this._gfs.showLog('AddNewComponentComponent', 'setData', '', null);
        this.escrowOrderID = eid;
        this.objectType = otype;
        this.nnumber = nn;
        this.serialNumber = sn;
        this.model = md;
        this.make = mk;    
    }

    saveComponent(): void {
        this._gfs.showLog('AddNewComponentComponent', 'saveComponent', '', null);
        let sp = new AircraftInventoryItem();
        sp.escrowOrderID = this.escrowOrderID;
        sp.inventoryObjectType = this.objectType;
        sp.nNumber = this.nnumber;
        sp.serialNumber = this.serialNumber;
        sp.make = this.make;
        sp.model = this.model;
    
        this._acservice.submitNewAircraftInventory(sp).subscribe({
          next: (response: any) => {
            this._gfs.showLog('AddNewComponentComponent', 'saveComponent', 'response:', response);
            this._dialogRef.close();
               
          },
          error: (err: HttpErrorResponse) => {
            this._gfs.showLog('AddNewComponentComponent', 'saveComponent', 'error:', err);
            if(err.status == 401){
                this._ts.signOut();
                this._rtr.navigate(['/sign-in']);;
            }
          }
          
        });
        
    }

    closeDialog(): void {
        this._gfs.showLog('AddNewComponentComponent', 'closeDialog', '', null);
        this._dialogRef.close();
    }


  }