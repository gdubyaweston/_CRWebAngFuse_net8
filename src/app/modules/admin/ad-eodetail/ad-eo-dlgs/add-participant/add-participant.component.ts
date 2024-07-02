import { NgIf, CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialog,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { AircraftInventoryItem } from 'app/modules/_modules/aircraftclasses';
import {
    EscrowParams,
    EscrowParticipant,
    EscrowRole,
} from 'app/modules/_modules/escrowclasses';
import {
    IntListItem,
    SearchParameters,
    ServiceResponse,
    StringListItem,
} from 'app/modules/_modules/serviceclasses';
import { AircraftService } from 'app/modules/_services/aircraft/acftinfo.service';
import { GlobalFunctionsService } from 'app/modules/_services/globalfunc/gfinfo.service';
import { TokenStorageService } from 'app/modules/_services/tokenstorage/tsinfo.service';
import { ParticipantSearchResultsComponent } from '../participant-search-results/participant-search-results.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ParticipantInfoService } from 'app/modules/_services/participant/parinfo.service';
import { EscrowOrderInfoService } from 'app/modules/_services/escrow/eoinfo.service';
import { MiscService } from 'app/modules/_services/misc/miscinfo.service';
import { DService } from 'app/modules/_services/dialog/dlgsvc.service';

@Component({
    selector: 'add-participant',
    standalone: true,
    templateUrl: './add-participant.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        NgIf,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        NgxMaskDirective,
    ],
    providers: [provideNgxMask()],
})
export class AddParticipantComponent {
    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    customerID: number = -1;
    escrowOrderID: number = -1;
    playerID: number = -1;

    countries: StringListItem[] = [{ id: '-1', name: 'Make Selection' }];
    usstates: StringListItem[] = [{ id: '-1', name: 'Make Selection' }];
    canadianstates: StringListItem[] = [{ id: '-1', name: 'Make Selection' }];

    roles: EscrowRole[] = [];

    daParticipant: EscrowParticipant = new EscrowParticipant();

    newRoleID: number = -1;

    //selectedCanadaID: number;
    //selectedUSID: number;

    isRegion: boolean = false;
    isUS: boolean = false;
    isCanada: boolean = false;

    //paramsSub: any;

    //daParticipant: EscrowParticipantDto;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _eois: EscrowOrderInfoService,
        private _par: ParticipantInfoService,
        private _misc: MiscService,
        private _acservice: AircraftService,
        private _dservice: DService,
        private _dialog: MatDialog,
        public _dialogRef: MatDialogRef<AddParticipantComponent>
    ) {
        this._gfs.showLog('AddParticipant', 'constructor', '', null);
        //this._gfs.allowCall = false;
    }

    ngOnInit(): void {
        this._gfs.showLog('AddParticipant', 'ngOnInit', '', null);

        this.getRoles();
        this.getCountries();
        this.getUSStates();
        this.getCanadianStates();

        this.daParticipant.selectedCountryID = 'US';
        this.daParticipant.country = 'US';
        this.newRoleID = -1;
        this.onCountryChange();

        //this.selectedCountryChanged();
        //this.selectedCountryID = 'US';
        //this.selectedCountryChanged();
    }

    setData(eid: number): void {
        this._gfs.showLog('AddParticipant', 'setData', '', null);

        this.escrowOrderID = eid;
    }

    onRoleChange(): void {
        this._gfs.showLog('AddParticipant', 'onRoleChange', '', null);
        //alert('Role change');
        //alert('Orig Role ID: ' + this.origRoleID);
        //alert('New Role ID: ' + this.newRoleID);
        //alert('Da Role: ' + this.daParticipant.roleID);
    }

    onClickShowEmail(): void {
        this._dservice.openAPEmail(
            'fs-dialog',
            'xsmall',
            'small',
            this.daParticipant,
            this
        );
    }

    onClickShowAddress(): void {
        this._dservice.openAPAddress(
            'fs-dialog',
            'xsmall',
            'small',
            this.daParticipant,
            this
        );
    }

    thecallback(): void {}

    saveParticipant(): void {
        this._gfs.showLog('AddParticipant', 'saveParticipant', '', null);

        var pp = this.populateParticipant();

        this._par.saveParticipant(pp).subscribe({
            next: (result: any) => {
                this._gfs.showLog(
                    'AddParticipant',
                    'saveParticipant',
                    'Result:',
                    result
                );
                if (result.success) {
                    this._dialogRef.close();
                } else {
                    alert(result.message);
                }
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog('AddParticipant', 'setData', 'Error:', err);
                if (err.status == 401) {
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }
            },
        });
    }

    populateParticipant(): EscrowParticipant {
        this._gfs.showLog('AddParticipant', 'populateParticipant', '', null);

        var pp = new EscrowParticipant();
        console.log(this.daParticipant);

        pp.firstName = this.daParticipant.firstName;
        pp.middleName = this.daParticipant.middleName;
        pp.lastName = this.daParticipant.lastName;
        pp.title = this.daParticipant.title;
        pp.trackerDisplayAlias = this.daParticipant.trackerDisplayAlias;
        pp.company = this.daParticipant.company;
        pp.email = this.daParticipant.email;
        pp.email2 = this.daParticipant.email2;
        pp.email3 = this.daParticipant.email3;
        pp.address = this.daParticipant.address;
        pp.address2 = this.daParticipant.address2;
        pp.address3 = this.daParticipant.address3;
        pp.city = this.daParticipant.city;
        pp.postal = this.daParticipant.postal;
        pp.businessPhone = this.daParticipant.businessPhone;
        pp.extension = this.daParticipant.extension;
        pp.businessFax = this.daParticipant.businessFax;
        pp.businessPhone2 = this.daParticipant.businessPhone2;
        pp.extension2 = this.daParticipant.extension2;
        pp.homePhone = this.daParticipant.homePhone;
        pp.homePhone2 = this.daParticipant.homePhone2;
        pp.homeFax = this.daParticipant.homeFax;
        pp.cellPhone = this.daParticipant.cellPhone;
        pp.pager = this.daParticipant.pager;
        pp.customerNotes = this.daParticipant.customerNotes;
        pp.escrowOrderID = this.escrowOrderID;
        pp.customerID = this.customerID;
        if (pp.customerID > 0) pp.flagged_AspNetEmailMatched = true;

        //pp.roleID = this.daParticipant.selectedRoleID;
        pp.roleID = this.daParticipant.roleID;

        pp.country = this.daParticipant.country;

        pp.region = this.daParticipant.region;
        pp.province = this.daParticipant.province;
        pp.state = this.daParticipant.state;

        //selectedRegion: string = '';
        //selectedUSID: string = '-1';
        //selectedCanadaID: string = '-1';

        return pp;
    }

    onCountryChange(): void {
        this._gfs.showLog('AddParticipant', 'onCountryChange', '', null);
        this.setFlags();
        if (this.isUS) {
            if (
                this.daParticipant.state != null &&
                this.daParticipant.state.length > 0
            ) {
            } else {
                this.daParticipant.state = '-1';
            }
        } else if (this.isCanada) {
            if (
                this.daParticipant.province != null &&
                this.daParticipant.province.length > 0
            ) {
            } else {
                this.daParticipant.province = '-1';
            }
        } else {
            if (
                this.daParticipant.region != null &&
                this.daParticipant.region.length > 0
            ) {
            } else {
                this.daParticipant.region = '';
            }
        }
    }

    setFlags(): void {
        this._gfs.showLog('AddParticipant', 'setFlags', '', null);
        if (this.daParticipant.country == 'US') {
            this.isUS = true;
            this.isCanada = false;
            this.isRegion = false;
        } else if (this.daParticipant.country == 'CA') {
            this.isUS = false;
            this.isCanada = true;
            this.isRegion = false;
        } else {
            this.isUS = false;
            this.isCanada = false;
            this.isRegion = true;
        }
    }

    onLastNameChanged(): void {
        this._gfs.showLog('AddParticipant', 'onLastNameChanged', '', null);

        if (this.daParticipant.lastName.length >= 4) {
            this.onParticipantSearch('lastname', this.daParticipant.lastName);
        }
    }

    onCompanyChanged(): void {
        this._gfs.showLog('AddParticipant', 'onCompanyChanged', '', null);

        if (this.daParticipant.company.length >= 4) {
            this.onParticipantSearch('company', this.daParticipant.company);
        }
    }

    onEmailChanged(): void {
        this._gfs.showLog('AddParticipant', 'onEmailChanged', '', null);

        if (this.daParticipant.email.length >= 4) {
            this.onParticipantSearch('email', this.daParticipant.email);
        }
    }

    onParticipantSearch(type: string, value: string): void {
        this._gfs.showLog('AddParticipant', 'onParticipantSearch', '', null);

        var par = new SearchParameters();
        if (type == 'lastname') par.lastName = value;
        if (type == 'company') par.company = value;
        if (type == 'email') par.email = value;

        this._par.getParticipants(par).subscribe({
            next: (result: any) => {
                this._gfs.showLog(
                    'AddParticipant',
                    'onParticipantSearch',
                    'Response:',
                    result
                );
                if (result.success && result.data.length > 0) {
                    this.openParticipantResult(result.data);
                }
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog(
                    'AddParticipant',
                    'onParticipantSearch',
                    'Error:',
                    err
                );
                if (err.status == 401) {
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }
            },
        });
    }

    openParticipantResult(data: EscrowParticipant[]): void {
        this._gfs.showLog('AddParticipant', 'openParticipantResult', '', null);

        let dr = this._dialog.open(ParticipantSearchResultsComponent, {
            restoreFocus: false,
            disableClose: false,
        });

        dr.componentInstance.setParticipants(data);

        dr.afterClosed().subscribe((res) => {
            this._gfs.showLog(
                'AddParticipant',
                'openParticipantResult',
                'afterClose',
                res.data
            );
            this.populateForm(res.data);
        });
    }

    private populateForm(data: EscrowParticipant): void {
      this._gfs.showLog('AddParticipant', 'populateForm', '', null);

      //this.daParticipant = data;

      
      
      //alert('rdata: ' + rdata.roleID + ' , ' + rdata.roleName);
      //alert('ep: ' + ep.roleID + ' , ' + ep.roleName);
      
      //this.daParticipant.roleID = data.roleID;
      //this.daParticipant.roleName = (data.roleName != null && data.roleName.length > 0) ? data.roleName : '';
      
      //alert('rdata: ' + rdata.roleID + ' , ' + rdata.roleName);
      //alert('ep: ' + ep.roleID + ' , ' + ep.roleName);
  
      this.daParticipant.firstName = data.firstName;
      this.daParticipant.middleName = data.middleName;
      this.daParticipant.lastName = data.lastName;
      this.daParticipant.title = data.title;
      this.daParticipant.trackerDisplayAlias = data.trackerDisplayAlias;
      this.daParticipant.company = data.company;
      this.daParticipant.email = data.email;
      this.daParticipant.email2 = data.email2;
      this.daParticipant.email3 = data.email3;
      this.daParticipant.address = data.address;
      this.daParticipant.address2 = data.address2;
      this.daParticipant.address3 = data.address3;
      this.daParticipant.city = data.city;
      this.daParticipant.postal = data.postal;
      this.daParticipant.businessPhone = data.businessPhone;
      this.daParticipant.extension = data.extension;
      this.daParticipant.businessFax = data.businessFax;
      this.daParticipant.businessPhone2 = data.businessPhone2;
      this.daParticipant.extension2 = data.extension2;
      this.daParticipant.homePhone = data.homePhone;
      this.daParticipant.homePhone2 = data.homePhone2;
      this.daParticipant.homeFax = data.homeFax;
      this.daParticipant.cellPhone = data.cellPhone;
      this.daParticipant.pager = data.pager;
      this.daParticipant.customerNotes = data.customerNotes;
      this.customerID = data.customerID;
      
      this.daParticipant.selectedRoleID = -1;
  
      this.daParticipant.selectedCountryID = data.country;
      //this.selectedCountryChanged();
  
      this.daParticipant.selectedRegion = data.region;
      this.daParticipant.province = data.province;
      this.daParticipant.state = data.state;
      
      
      
      
      
      /*
      isRegion: boolean = false;
      isUS: boolean = false;
      isCanada: boolean = false;
      selectedRegion: string = '';
      selectedUSID: string = '-1';
      selectedCanadaID: string = '-1';
      */
      
  
    }

    // load data
    private getCountries(): void {
        this._gfs.showLog('AddParticipant', 'getCountries', '', null);

        this._misc.getCountries().subscribe({
            next: (result: any) => {
                this._gfs.showLog(
                    'AddParticipant',
                    'getCountries',
                    'Response:',
                    result
                );
                this.countries = result.data;
                this.countries.unshift({
                    id: '-1',
                    name: 'Please Select Country',
                });
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog(
                    'AddParticipant',
                    'getCountries',
                    'Error:',
                    err
                );
                if (err.status == 401) {
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }
            },
        });
    }

    private getUSStates(): void {
        this._gfs.showLog('AddParticipant', 'getUSStates', '', null);

        this._misc.getUSStates().subscribe({
            next: (result: any) => {
                this._gfs.showLog(
                    'AddParticipant',
                    'getUSStates',
                    'Response:',
                    result
                );
                this.usstates = result.data;
                this.usstates.unshift({
                    id: '-1',
                    name: 'Please Select State',
                });
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog(
                    'AddParticipant',
                    'getUSStates',
                    'Error:',
                    err
                );
                if (err.status == 401) {
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }
            },
        });
    }

    private getCanadianStates(): void {
        this._gfs.showLog('AddParticipant', 'getCanadianStates', '', null);

        this._misc.getCanadianStates().subscribe({
            next: (result: any) => {
                this._gfs.showLog(
                    'AddParticipant',
                    'getCanadianStates',
                    'Response:',
                    result
                );
                this.canadianstates = result.data;
                this.canadianstates.unshift({
                    id: '-1',
                    name: 'Please Select Canadian State',
                });
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog(
                    'AddParticipant',
                    'getCanadianStates',
                    'Error:',
                    err
                );
                if (err.status == 401) {
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }
            },
        });
    }

    private getRoles(): void {
        this._gfs.showLog('AddParticipant', 'getRoles', '', null);

        this._eois.getEscrowRoleParticipants().subscribe({
            next: (result: any) => {
                this._gfs.showLog(
                    'AddParticipant',
                    'getRoles',
                    'Response:',
                    result
                );
                this.roles = result.data;
                this.roles.unshift({
                    roleId: -1,
                    roleName: 'Please Select Role',
                    isBccRecipient: false,
                    closingRoomNameCombo: false,
                    closingStatementTitle: '',
                    description: '',
                    displayOrder: 0,
                });
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog('AddParticipant', 'getRoles', 'Error:', err);
                if (err.status == 401) {
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }
            },
        });
    }

    /*

    onCountryChange(): void {
      this._gfs.showLog('AddParticipant', 'onCountryChange', '', null);
      this.setFlags();
      if(this.isUS){
        if(this.daParticipant.state != null && this.daParticipant.state.length > 0){}
        else
        {this.daParticipant.state = '-1';}
      }
      else if(this.isCanada){
        if(this.daParticipant.province != null && this.daParticipant.province.length > 0){}
        else
        {this.daParticipant.province = '-1';}
      }
      else{
        if(this.daParticipant.region != null && this.daParticipant.region.length > 0){}
        else
        {this.daParticipant.region = '-1';}
      }

    }

    setFlags(): void {
      this._gfs.showLog('AddParticipant', 'setFlags', '', null);
      if(this.daParticipant.country == 'US'){
        this.isUS = true;
        this.isCanada = false;
        this.isRegion = false;
      }
      else if(this.daParticipant.country == 'CA'){
        this.isUS = false;
        this.isCanada = true;
        this.isRegion = false;
      }
      else {
        this.isUS = false;
        this.isCanada = false;
        this.isRegion = true;
      }
    }

    saveParticipant(): void {
      this._gfs.showLog('AddParticipant', 'saveParticipant', '', null);

      
      
      var pp = this.populateParticipant();
  
      this._eos.saveParticipant(pp).subscribe({
        next: (result: any) => {
          this._gfs.showLog('AddParticipant', 'saveParticipant', 'Result:', result);
          if(result.success){
              this._dialogRef.close();
          }
          else{
              alert(result.message);
          } 
                  
        },
        error: (err: HttpErrorResponse) => {
          this._gfs.showLog('AddParticipant', 'setData', 'Error:', err);
          if (err.status == 401) {
              this._ts.signOut();
              this._rtr.navigate(['/sign-in']);
          }
        },
     });
     
      
    }





    



    formatPhone(event: Event): string {
        this._gfs.showLog('AddParticipant', 'formatPhone', '', null);

        var daFilterValue = (event.target as HTMLInputElement).value;
        daFilterValue = daFilterValue + '>>';
        return daFilterValue;
    }
    
    

    
    
    populateParticipant(): EscrowParticipant {
        this._gfs.showLog('AddParticipant', 'populateParticipant', '', null);

        var pp = new EscrowParticipant();
        console.log(this.daParticipant);
    
        pp.firstName = this.daParticipant.firstName;
        pp.middleName = this.daParticipant.middleName;
        pp.lastName = this.daParticipant.lastName;
        pp.title = this.daParticipant.title;
        pp.trackerDisplayAlias = this.daParticipant.trackerDisplayAlias;
        pp.company = this.daParticipant.company;
        pp.email = this.daParticipant.email;
        pp.email2 = this.daParticipant.email2;
        pp.email3 = this.daParticipant.email3;
        pp.address = this.daParticipant.address;
        pp.address2 = this.daParticipant.address2;
        pp.address3 = this.daParticipant.address3;
        pp.city = this.daParticipant.city;
        pp.postal = this.daParticipant.postal;
        pp.businessPhone = this.daParticipant.businessPhone;
        pp.extension = this.daParticipant.extension;
        pp.businessFax = this.daParticipant.businessFax;
        pp.businessPhone2 = this.daParticipant.businessPhone2;
        pp.extension2 = this.daParticipant.extension2;
        pp.homePhone = this.daParticipant.homePhone;
        pp.homePhone2 = this.daParticipant.homePhone2;
        pp.homeFax = this.daParticipant.homeFax;
        pp.cellPhone = this.daParticipant.cellPhone;
        pp.pager = this.daParticipant.pager;
        pp.customerNotes = this.daParticipant.customerNotes;
        pp.escrowOrderID = this.escrowOrderID;
        pp.customerID = this.customerID;
        if(pp.customerID > 0)
          pp.flagged_AspNetEmailMatched = true;
        
        pp.roleID = this.daParticipant.selectedRoleID;
    
        pp.country = this.daParticipant.selectedCountryID;
    
        pp.region = this.daParticipant.selectedRegion;
        pp.province = this.daParticipant.province;
        pp.state = this.daParticipant.state;
        
        //selectedRegion: string = '';
        //selectedUSID: string = '-1';
        //selectedCanadaID: string = '-1';
    
        return pp;
    }

    



    

    

    
    

    

    
    */
}
