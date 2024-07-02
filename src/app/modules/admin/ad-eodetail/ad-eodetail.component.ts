import { CommonModule, NgIf } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { LoginUser } from "app/modules/_modules/loginclasses";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AircraftInventoryItem } from "app/modules/_modules/aircraftclasses";
import { EscrowOrder, EscrowParams } from "app/modules/_modules/escrowclasses";
import { EscrowOrderInfoService } from "app/modules/_services/eoinfo.service";
import { MatMenuModule } from "@angular/material/menu";
import { MatMenuTrigger } from "@angular/material/menu";  
import { MatDialog, MatDialogModule } from "@angular/material/dialog";

import { CreateDemoOrderComponent } from "./ad-eo-dlgs/create-demo-order/create-demo-order.component";
import { CreateLinkedOrderComponent } from "./ad-eo-dlgs/create-linked-order/create-linked-order.component";
import { SearchAddToClosingComponent } from "./ad-eo-dlgs/search-add-to-closing/search-add-to-closing.component";
import { UpdateClosingDescriptionComponent } from "./ad-eo-dlgs/update-closing-description/update-closing-description.component";
import { SendEmailEscrowDetailComponent } from "./ad-eo-dlgs/send-email-escrow-detail/send-email-escrow-detail.component";
import { TitleSearchComponent } from "./ad-eo-dlgs/title-search/title-search.component";
import { TSARComponent } from "./ad-eo-dlgs/tsar/tsar.component";
import { ViewLatestFXAgreementComponent } from "./ad-eo-dlgs/view-latest-fxagreement/view-latest-fxagreement.component";
import { AddParticipantComponent } from "./ad-eo-dlgs/add-participant/add-participant.component";
import { WireInformationComponent } from "./ad-eo-dlgs/wire-information/wire-information.component";
import { Dialog } from "@angular/cdk/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { DService } from "app/modules/_services/dlgsvc.service";

@Component({
    selector: 'ad-eodetail',
    standalone: true,
    templateUrl: './ad-eodetail.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [NgIf, CommonModule, MatToolbarModule, MatMenuModule, MatDialogModule, MatCardModule, MatIconModule,],
})
export class ADEODetailComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    paramsSub: any;
    escrowOrderID: number = 0;
    userInfo: LoginUser;
    userSession: string = '';
    isAgent: boolean = this._ts.IsAgent();
    isDeveloper: boolean = this._ts.IsDeveloper();
    escrowTitle: string = 'No Title';
    showItems: boolean = false;
    escrowURL: string = 'api/escrowdetails/escroworderdetail';
    escrowItems: string = 'No Items';
    closingItemsText: string = "(View Closing Items <i class='fa fa-eye'></i>)";
    escrowDetails: EscrowOrder;
    itemsOrderBy: AircraftInventoryItem[]; 

    currentDT: Date = new Date();

    @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _eos: EscrowOrderInfoService,
        private _dsadeo: DService,
        private _dialog: MatDialog,
        ) 
    {
        this._gfs.showLog('ADEODetailComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
        this.escrowDetails = new EscrowOrder();
    }

    ngAfterViewInit(): void {
      this._gfs.showLog('ADEODetailComponent', 'ngAfterViewInit', '', null);
    }

    ngOnInit(): void {
      this._gfs.showLog('ADEODetailComponent', 'ngOnInit', '', null);
      this.userInfo = this._ts.getUser();
      this.userSession = this._ts.getToken();    
        
      this.paramsSub = this._activatedRoute.params.subscribe((params) => {
          this.escrowOrderID = params['escrowOrderID'];
      });

      this.getDetails();

    }

    ngOnDestroy(): void {
        this._gfs.showLog('ADEODetailComponent', 'ngOnDestroy', '', null);
    }

    toggleClosingItems(): void {
        this._gfs.showLog('ADEODetailComponent', 'toggleClosingItems', '', null);
        this.showItems = !this.showItems;
        if (this.closingItemsText.startsWith('(View Closing')) {
          this.closingItemsText =
            "(Hide Closing Items <i class='fa fa-eye-slash'></i>)";
        } else {
          this.closingItemsText = "(View Closing Items <i class='fa fa-eye'></i>)";
        }
    }

    getDetails(): void {
        this._gfs.showLog('ADEODetailComponent', 'getDetails', '', null);
        
        let epdto = new EscrowParams();
        epdto.escrowOrderID = this.escrowOrderID;

        this._eos.getEscrowOrder(epdto).subscribe({
            next: (response: any) => {
              this._gfs.showLog('ADEODetailComponent', 'getDetails', 'Respone:', response);
                
                if(response.success && response.data){
                  this._gfs.showLog('ADEODetailComponent', 'getDetails', 'Get Escrow Order Success:', null);
                    
                    this.escrowDetails = response.data;
                    this.escrowTitle = this.buildTitle();
                    this.itemsOrderBy = this.escrowDetails.inventoryItems.sort((a, b) =>
                        a.inventoryObjectType > b.inventoryObjectType
                        ? 1
                        : b.inventoryObjectType > a.inventoryObjectType
                        ? -1
                        : 0
                    );
                    
                }
                else{
                  this._gfs.showLog('ADEODetailComponent', 'getDetails', 'Get Escrow Order Fail:', null);
                }

            },
            error: (err: HttpErrorResponse) => {
              this._gfs.showLog('ADEODetailComponent', 'getDetails', 'Error:', err);
              if(err.status == 401){
                  this._ts.signOut();
                  this._rtr.navigate(['/sign-in']);
              }
            },
        });

    }

    buildTitle(): string {
        if (
          this.escrowDetails !== null &&
          this.escrowDetails.escrowDescription !== null &&
          this.escrowDetails.escrowDescription.length > 0
        ) {
          return this.escrowDetails.escrowDescription;
        }
    
        if (
          this.escrowDetails !== null &&
          this.escrowDetails.inventoryItems !== null &&
          this.escrowDetails.inventoryItems.length > 0
        ) {
          var acItem = this.escrowDetails.inventoryItems.find(
            (t) => t.inventoryObjectType === 'Airframe'
          );
          if (acItem !== null && acItem !== undefined) {
            if (acItem.nNumber.length > 0) {
              if (acItem.registrationCountry === 'US') {
                var nn = acItem.nNumber.trim().toUpperCase();
                if (nn[0] === 'N') {
                  nn = nn.replace(nn[0], '');
                }
                return 'N' + nn;
              } else {
                return acItem.nNumber.trim().toUpperCase();
              }
            }
          }
        }
    
        return '';
    }

    thecallback(): void { this.getDetails();  }

    openCreateDemoOrder(): void {
      this._dsadeo.openCreateDemoOrder('fs-dialog', 'small', 'small', this.escrowOrderID, this);      
    }

    openCreateLinkedOrder(): void {
      this._dsadeo.openCreateLinkedOrder('fs-dialog', 'small', 'small', this.escrowOrderID, this);      
    }
    
    openSearchAddToClosing(): void {
      this._dsadeo.openSearchAddToClosing('fs-dialog', 'xlarge', 'xlarge', this.escrowOrderID, this);
    }    

    openUpdateClosingDescription(): void {
      this._dsadeo.openUpdateClosingDescription('fs-dialog', 'medium', 'medium', this.escrowOrderID, this);
    }

    openSendEmailEscrowDetail(): void {
      this._dsadeo.openSendEmailEscrowDetail('fs-dialog', 'small', 'small', this.escrowOrderID, this.escrowDetails.participants, this);
    }

    openTitleSearch(): void {
      this._dsadeo.openTitleSearch('fs-dialog', 'small', 'small', this.escrowOrderID, this.escrowDetails.participants, this.escrowDetails.inventoryItems, this.escrowDetails.tsOrderID, this); 
    }

    openTSAR(): void {
      this._dsadeo.openTSAR('fs-dialog', 'small', 'small', this.escrowOrderID, this.escrowDetails.participants, this.escrowDetails.tsOrderID, this);
    }

    openViewLatestFXAgreement(): void {
      this._dsadeo.openViewLatestFXAgreement('fs-dialog', 'large', 'large', this);
    }

    openAddParticipant(): void {
      this._dsadeo.openAddParticipant('fs-dialog', 'medium', 'large', this.escrowOrderID, this);
    }
    
    openWireInformation(): void {
      this._dsadeo.openWireInformation('fs-dialog', 'large', 'large', this.escrowOrderID, this);
    }

    openFunds(): void {
      this._dsadeo.openFunds('fs-dialog', 'large', 'large', this.escrowOrderID, this);
    }

    openLinkedOrders(): void {
      this._dsadeo.openLinkedOrders('fs-dialog', 'large', 'large', this.escrowOrderID, this);
    }

    openNewDigitalSignature(): void {
      this._dsadeo.openNewDigitalSignature('fs-dialog', 'large', 'large', this.escrowOrderID, this);
    }

    openViewEditCustomerProfile(custID: number, partID: number): void {
      this._dsadeo.openViewEditCustomerProfile('fs-dialog', 'medium', 'large', this.escrowOrderID, custID, partID, this);
      //openViewEditCustomerProfile(p.customerID, p.participantID, true, true, 'fullscreen-dialog', '95', '95');
    }

    openCreateBOSPDF(): void {
      this._dsadeo.openCreateBOSPDF('fs-dialog', 'medium', 'medium', this.escrowOrderID, this);
    }

    openCreateARAPDF(): void {
      this._dsadeo.openCreateARAPDF('fs-dialog', 'large', 'large', this.escrowOrderID, this);
    }

    openCreatePOIPDF(): void {
      this._dsadeo.openCreatePOIPDF('fs-dialog', 'large', 'large', this.escrowOrderID, this);
    }

    openEditPOI(): void {
      this._dsadeo.openEditPOI('fs-dialog', 'large', 'large', this.escrowOrderID, this);
    }

    openRequestPhotoID(): void {
      this._dsadeo.openRequestPhotoID('fs-dialog', 'large', 'large', this.escrowOrderID, this);
    }

    openSendEmail(): void {
      this._dsadeo.openSendEmail('fs-dialog', 'large', 'large', this.escrowOrderID, this);
    }

    openSendFXAgreement(): void {
      this._dsadeo.openSendFXAgreement('fs-dialog', 'large', 'large', this.escrowOrderID, this);
    }

    openEditItems(): void {
      this._dsadeo.openEditItems('fs-dialog', 'large', 'large', this.escrowOrderID, this);
    }

    
    
/*

<button mat-menu-item (click)="1_openEditPOI(true, true, 'fullscreen-dialog', '85', '95');">Edit POI</button>
<button mat-menu-item (click)="2_openRequestPhotoID(true, true, 'fullscreen-dialog', '85', '95');">Request Photo Id</button>
<button mat-menu-item (click)="3_openSendEmail(true, true, 'fullscreen-dialog', '85', '95');">Send Email</button>

<button mat-menu-item (click)="4_openSendFXAgreement(true, true, 'fullscreen-dialog', '85', '95');">Send FX Agreement</button>
<button mat-menu-item (click)="5_openEditItems(true, true, 'fullscreen-dialog', '85', '95');">Edit Items</button>

<button mat-menu-item (click)="openViewLatestFXAgreement(true, true, 'fullscreen-dialog', '85', '95');">View Latest FX Agreement</button>



*/




    
}