import { Injectable } from "@angular/core";
import { GlobalFunctionsService } from "./gfinfo.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogService } from "./dlg.service";
import { EscrowParticipant } from "app/modules/_modules/escrowclasses";
import { AddParticipantComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/add-participant/add-participant.component";
import { APAddressComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/add-participant/ap-address/ap-address.component";
import { APEmailComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/add-participant/ap-email/ap-email.component";
import { ViewEditCustomerProfileComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/view-edit-customer-profile/view-edit-customer-profile.component";
import { CPAddressComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/view-edit-customer-profile/cp-address/cp-address.component";
import { CPEmailComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/view-edit-customer-profile/cp-email/cp-email.component";
import { CustomerInfo } from "app/modules/_modules/customerclasses";
import { ADSearchCustomersComponent } from "app/modules/admin/ad-search/ad-search-customers/ad-search-customers.component";
import { ADSearchCustomerShowComponent } from "app/modules/admin/ad-search/ad-search-customers/ad-search-customer-show/ad-search-customer-show.component";
import { WireInformationComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/wire-information/wire-information.component";
import { AddWireInformationComponent } from "../admin/ad-eodetail/ad-eo-dlgs/add-wire-information/add-wire-information.component";
import { AddReceivedFundsComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/add-received-funds/add-received-funds.component";
import { AddReleasedFundsComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/add-released-funds/add-released-funds.component";
import { FundsComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/funds/funds.component";
import { FundStatementsComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/fund-statements/fund-statements.component";
import { EditReceivedFundsComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/edit-received-funds/edit-received-funds.component";
import { EditReleasedFundsComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/edit-released-funds/edit-released-funds.component";
import { CreateClosingStatementComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/create-closing-statement/create-closing-statement.component";
import { CreateAccountingStatementComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/create-accounting-statement/create-accounting-statement.component";
import { ADEODetailComponent } from "app/modules/admin/ad-eodetail/ad-eodetail.component";
import { CreateDemoOrderComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/create-demo-order/create-demo-order.component";
import { CreateLinkedOrderComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/create-linked-order/create-linked-order.component";
import { SearchAddToClosingComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/search-add-to-closing/search-add-to-closing.component";
import { UpdateClosingDescriptionComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/update-closing-description/update-closing-description.component";
import { AircraftInventoryItem } from "app/modules/_modules/aircraftclasses";
import { SendEmailEscrowDetailComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/send-email-escrow-detail/send-email-escrow-detail.component";
import { TitleSearchComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/title-search/title-search.component";
import { TSARComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/tsar/tsar.component";
import { ViewLatestFXAgreementComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/view-latest-fxagreement/view-latest-fxagreement.component";
import { LinkedOrdersComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/linked-orders/linked-orders.component";
import { NewDigitalSignatureComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/new-digital-signature/new-digital-signature.component";
import { EditItemsComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/edit-items/edit-items.component";
import { SendFXAgreementComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/send-fx-agreement/send-fx-agreement.component";
import { SendEmailComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/send-email/send-email.component";
import { RequestPhotoIDComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/request-photoid/request-photoid.component";
import { EditPoiComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/edit-poi/edit-poi.component";
import { CreatePoiPdfComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/create-poi-pdf/create-poi-pdf.component";
import { CreateARAPdfComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/create-ara-pdf/create-ara-pdf.component";
import { CreateBosPdfComponent } from "app/modules/admin/ad-eodetail/ad-eo-dlgs/create-bos-pdf/create-bos-pdf.component";



@Injectable({
    providedIn: 'root'
})
export class DService {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    constructor(
        private _dialog: MatDialog,
        private _dlgService: DialogService,
    ) 
    { 
        this._gfs.showLog('DService', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    openAPAddress(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: EscrowParticipant, dd: AddParticipantComponent): void {
          
        const dr = this._dialog.open(APAddressComponent, 
        { autoFocus: true, disableClose: true, panelClass: pnlClass,
          width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%'
        });
      
        dr.componentInstance.setData(eid);
    
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
    
    }

    openAPEmail(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: EscrowParticipant, dd: AddParticipantComponent): void {
          
        const dr = this._dialog.open(APEmailComponent, 
        { autoFocus: true, disableClose: true, panelClass: pnlClass,
          width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%'
        });
      
        dr.componentInstance.setData(eid);
    
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
    
    }

    openCPAddress(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: EscrowParticipant, dd: ViewEditCustomerProfileComponent): void {
          
        const dr = this._dialog.open(CPAddressComponent, 
        { autoFocus: true, disableClose: true, panelClass: pnlClass,
          width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%'
        });
      
        dr.componentInstance.setData(eid);
    
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
    
    }
    
    openCPEmail(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: EscrowParticipant, dd: ViewEditCustomerProfileComponent): void {
          
        const dr = this._dialog.open(CPEmailComponent, 
        { autoFocus: true, disableClose: true, panelClass: pnlClass,
          width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%'
        });
      
        dr.componentInstance.setData(eid);
    
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
    
    }
    
    openADSearchCustomer(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: CustomerInfo, dd: ADSearchCustomersComponent): void {
          
          const dr = this._dialog.open(ADSearchCustomerShowComponent, 
            { autoFocus: true, disableClose: true, panelClass: pnlClass,
              width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%'
            });
      
          dr.componentInstance.setData(eid);
    
          dr.afterClosed().subscribe(result => { dd.thecallback(); });
          
    }

    openAddWireInfo(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: WireInformationComponent): void {
        
        const dr = this._dialog.open(AddWireInformationComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid);
        
        dr.afterClosed().subscribe(result => { dd.thecallback(); });

    } 

    openAddReceivedFunds_CCS(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: AddReceivedFundsComponent): void {
          
        const dr = this._dialog.open(AddReceivedFundsComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
      
          dr.componentInstance.setData(eid);
  
          dr.afterClosed().subscribe(result => { dd.thecallback(); });              
      
    }
  
    openAddReleasedFunds_CCS(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: AddReleasedFundsComponent): void {
          
        const dr = this._dialog.open(AddReleasedFundsComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });            
    
    }

    openCAStatements(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: FundsComponent): void {
          
        const dr = this._dialog.open(FundStatementsComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
      
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });             
      
    }

    openEditReceivedFunds(pnlClass: string, dlgSizeW: string, dlgSizeH: string, fundID: number, eid: number, dd: FundsComponent): void {
          
        const dr = this._dialog.open(EditReceivedFundsComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });    
    
        dr.componentInstance.setData(eid, fundID);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });         
    
    }
    
    openEditReleasedFunds(pnlClass: string, dlgSizeW: string, dlgSizeH: string, fundID: number, eid: number, dd: FundsComponent): void {
          
        const dr = this._dialog.open(EditReleasedFundsComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid, fundID);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });          
        
    }

    openAddClosingStatement(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: FundStatementsComponent): void {
          
        const dr = this._dialog.open(CreateClosingStatementComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
          
    }
    
    openAddAccountingStatement(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: FundStatementsComponent): void {
          
        const dr = this._dialog.open(CreateAccountingStatementComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });          
    
    }
  
    openAddReceivedFunds(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: FundsComponent): void {
          
        const dr = this._dialog.open(AddReceivedFundsComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
      
          dr.componentInstance.setData(eid);
  
          dr.afterClosed().subscribe(result => { dd.thecallback(); });
              
      
    } 
      
      
    openAddReleasedFunds(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: FundsComponent): void {
          
          const dr = this._dialog.open(AddReleasedFundsComponent, 
            { autoFocus: true, disableClose: true, panelClass: pnlClass,
              width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
            });
      
          dr.componentInstance.setData(eid);
  
          dr.afterClosed().subscribe(result => { dd.thecallback(); });
              
      
    }

    //==================================================================================================================

    openCreateDemoOrder(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
        
        const dr = this._dialog.open(CreateDemoOrderComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%'
          });
    
        dr.componentInstance.setData(eid);

        dr.afterClosed().subscribe(result => { dd.thecallback(); });       
        
    }

    openCreateLinkedOrder(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
        
        const dr = this._dialog.open(CreateLinkedOrderComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid);

        dr.afterClosed().subscribe(result => { dd.thecallback(); });
        
    }
    
    openSearchAddToClosing(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
        
        const dr = this._dialog.open(SearchAddToClosingComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid);
        
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
        
    }

    openUpdateClosingDescription(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
        
        const dr = this._dialog.open(UpdateClosingDescriptionComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid);
        
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
    }

    openSendEmailEscrowDetail(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, pids: EscrowParticipant[], dd: ADEODetailComponent): void {
        
        const dr = this._dialog.open(SendEmailEscrowDetailComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid, pids);

        dr.afterClosed().subscribe(result => { dd.thecallback(); });
    }
  
    openTitleSearch(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, pids: EscrowParticipant[], 
        iitems: AircraftInventoryItem[], tsoid: number, dd: ADEODetailComponent): void {
            
        const dr = this._dialog.open(TitleSearchComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid, pids, iitems, tsoid);

        dr.afterClosed().subscribe(result => { dd.thecallback(); });
                
    }
  
    openTSAR(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, pids: EscrowParticipant[], tsoid: number, dd: ADEODetailComponent): void {
        
        const dr = this._dialog.open(TSARComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid, pids, tsoid);
        
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
        
    }
  
    openViewLatestFXAgreement(pnlClass: string, dlgSizeW: string, dlgSizeH: string, dd: ADEODetailComponent): void {
        
        const dr = this._dialog.open(ViewLatestFXAgreementComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(6); 
        
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
        
    }

    openAddParticipant(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
        
        const dr = this._dialog.open(AddParticipantComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid);
        
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
        
    }  
      
    openWireInformation(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
        
        const dr = this._dialog.open(WireInformationComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid);  
        
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
        
    }

    openFunds(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
        
      const dr = this._dialog.open(FundsComponent, 
        { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
        });
  
      dr.componentInstance.setData(eid);

      dr.afterClosed().subscribe(result => { dd.thecallback(); });
        
    }

    openLinkedOrders(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
        
        const dr = this._dialog.open(LinkedOrdersComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
          
      }
  
      openNewDigitalSignature(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
        
        const dr = this._dialog.open(NewDigitalSignatureComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
    
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
          
      }

      openViewEditCustomerProfile(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, custID: number, partID: number, dd: ADEODetailComponent): void {
        
        const dr = this._dialog.open(ViewEditCustomerProfileComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
      
        dr.componentInstance.setData(custID, eid, partID);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
             
      
      }
  
      openCreateBOSPDF(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
          
        const dr = this._dialog.open(CreateBosPdfComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
      
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
             
      
      }
  
      openCreateARAPDF(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
          
        const dr = this._dialog.open(CreateARAPdfComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
      
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
             
      
      }
  
      openCreatePOIPDF(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
          
        const dr = this._dialog.open(CreatePoiPdfComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
      
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
             
      
      }
  
      openEditPOI(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
          
        const dr = this._dialog.open(EditPoiComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
      
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
             
      
      }
  
      openRequestPhotoID(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
          
        const dr = this._dialog.open(RequestPhotoIDComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
      
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
             
      
      }
  
      openSendEmail(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
          
        const dr = this._dialog.open(SendEmailComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
      
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
             
      
      }
  
      openSendFXAgreement(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
          
        const dr = this._dialog.open(SendFXAgreementComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%'
          });
      
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
             
      
      }
  
      openEditItems(pnlClass: string, dlgSizeW: string, dlgSizeH: string, eid: number, dd: ADEODetailComponent): void {
          
        const dr = this._dialog.open(EditItemsComponent, 
          { autoFocus: true, disableClose: true, panelClass: pnlClass,
            width: this._dlgService.dlgWidth(dlgSizeW) + '%', height: this._dlgService.dlgHeight(dlgSizeH) + '%' 
          });
      
        dr.componentInstance.setData(eid);
  
        dr.afterClosed().subscribe(result => { dd.thecallback(); });
             
      
      }

}