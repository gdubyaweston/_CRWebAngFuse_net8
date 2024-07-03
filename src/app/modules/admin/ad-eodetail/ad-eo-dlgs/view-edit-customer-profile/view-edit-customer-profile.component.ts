import { NgIf, CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
    MatDialogModule,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import {
    EscrowParticipant,
    EscrowRole,
} from 'app/modules/_modules/escrowclasses';
import {
    SearchParameters,
    StringListItem,
} from 'app/modules/_modules/serviceclasses';
import { AircraftService } from 'app/modules/_services/acftinfo.service';
import { DService } from 'app/modules/_services/dlgsvc.service';
import { FundingService } from 'app/modules/_services/fundinfo.service';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';
import { MiscService } from 'app/modules/_services/miscinfo.service';
import { TokenStorageService } from 'app/modules/_services/tsinfo.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ParticipantSearchResultsComponent } from '../participant-search-results/participant-search-results.component';
import { ParticipantInfoService } from 'app/modules/_services/parinfo.service';
import { EscrowOrderInfoService } from 'app/modules/_services/eoinfo.service';


@Component({
    selector: 'view-edit-customer-profile',
    standalone: true,
    templateUrl: './view-edit-customer-profile.component.html',
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
        MatDatepickerModule,
        MatFormFieldModule,
        NgxMaskDirective,
    ],
    providers: [provideNgxMask()],
})
export class ViewEditCustomerProfileComponent {
    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    customerID: number = -1;
    escrowOrderID: number = -1;
    playerID: number = -1;

    countries: StringListItem[] = [{ id: '-1', name: 'Make Selection' }];
    usstates: StringListItem[] = [{ id: '-1', name: 'Make Selection' }];
    canadianstates: StringListItem[] = [{ id: '-1', name: 'Make Selection' }];

    roles: EscrowRole[] = [];

    daParticipant: EscrowParticipant = new EscrowParticipant();

    origRoleID: number = -1;
    newRoleID: number = -1;

    //selectedCanadaID: number;
    //selectedUSID: number;

    isRegion: boolean = false;
    isUS: boolean = false;
    isCanada: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _eois: EscrowOrderInfoService,
        private _par: ParticipantInfoService,
        private _acservice: AircraftService,
        private _ms: MiscService,
        private _fs: FundingService,
        private _dservice: DService,
        private _dialog: MatDialog,
        public _dialogRef: MatDialogRef<ViewEditCustomerProfileComponent>
    ) {
        this._gfs.showLog('ViewEditCustomerProfile', 'constructor', '', null);
        //this._gfs.allowCall = false;
        //alert('[constructor] Orig Role ID: ' + this.origRoleID);
        //alert('[constructor] New Role ID: ' + this.newRoleID);
    }

    ngAfterViewInit(): void {
        this._gfs.showLog(
            'ViewEditCustomerProfile',
            'ngAfterViewInit',
            '',
            null
        );
    }

    ngOnInit(): void {
        this._gfs.showLog('ViewEditCustomerProfile', 'ngOnInit', '', null);
        this.getRoles();
        this.getCountries();
        this.getUSStates();
        this.getCanadianStates();

        //this.daParticipant.selectedCountryID = 'US';
        //this.selectedCountryChanged();

        this.retrieveCustomer();
        this.origRoleID = this.daParticipant.roleID;
        this.newRoleID = -1;
    }

    onClickShowEmail(): void {
        this._dservice.openCPEmail(
            'fs-dialog',
            'xsmall',
            'small',
            this.daParticipant,
            this
        );
    }

    onClickShowAddress(): void {
        this._dservice.openCPAddress(
            'fs-dialog',
            'xsmall',
            'small',
            this.daParticipant,
            this
        );
    }

    /*
    setEPData(eid:EscrowParticipant): void {
      this._gfs.showLog('ViewEditCustomerProfile', 'setEPData', '', null);
    }
    */

    thecallback(): void {}

    onRoleChange(): void {
        this._gfs.showLog('ViewEditCustomerProfile', 'onRoleChange', '', null);
        //alert('Role change');
        //alert('Orig Role ID: ' + this.origRoleID);
        //alert('New Role ID: ' + this.newRoleID);
        //alert('Da Role: ' + this.daParticipant.roleID);
    }

    setData(cid: number, eid: number, pid: number): void {
        this._gfs.showLog('ViewEditCustomerProfile', 'setData', '', null);
        this.customerID = cid;
        this.escrowOrderID = eid;
        this.playerID = pid;
    }

    setFlags(): void {
        this._gfs.showLog('ViewEditCustomerProfile', 'setFlags', '', null);
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

    retrieveCustomer(): void {
        this._gfs.showLog(
            'ViewEditCustomerProfile',
            'retrieveCustomer',
            '',
            null
        );

        this.daParticipant = new EscrowParticipant();

        if (this.customerID > 0 && this.playerID > 0) {
            var par = new SearchParameters();
            par.customerID = this.customerID;
            par.playerID = this.playerID;

            this._par.getParticipantSearch(par).subscribe({
                next: (result: any) => {
                    this._gfs.showLog(
                        'ViewEditCustomerProfile',
                        'retrieveCustomer',
                        'Response:',
                        result
                    );
                    if (result.success && result.data !== null) {
                        this.daParticipant = result.data;
                        this.setFlags();

                        this.origRoleID = this.daParticipant.roleID;

                        //this.populateForm(this.daParticipant);
                    } else {
                        alert('Retrieve Customer Failed!!!!!!!!!!!');
                    }
                },
                error: (err: HttpErrorResponse) => {
                    this._gfs.showLog(
                        'ViewEditCustomerProfile',
                        'retrieveCustomer',
                        'Error:',
                        err
                    );
                    if (err.status == 401) {
                        this._ts.signOut();
                        this._rtr.navigate(['/sign-up']);
                    }
                },
            });
        }
    }

    saveCustomer(): void {
        this._gfs.showLog('ViewEditCustomerProfile', 'saveCustomer', '', null);

        if (
            this.daParticipant.customerID > 0 &&
            this.daParticipant.participantID > 0
        ) {
            this.daParticipant = this.setCustomerData(this.daParticipant);
            if (this.newRoleID > 0) {
                this.daParticipant.roleID = this.newRoleID;
            }

            this._par.saveParticipant(this.daParticipant).subscribe({
                next: (result: any) => {
                    this._gfs.showLog(
                        'ViewEditCustomerProfile',
                        'saveCustomer',
                        'Response:',
                        result
                    );
                    if (result.success) {
                        //alert('Save Customer/Participant Success!!');
                        this._dialogRef.close();
                        this.retrieveCustomer();
                    } else {
                        alert('Save Customer/Participant Failure!!');
                        alert(result.message);
                    }
                },
                error: (err: HttpErrorResponse) => {
                    this._gfs.showLog(
                        'ViewEditCustomerProfile',
                        'saveCustomer',
                        'Error:',
                        err
                    );
                    if (err.status == 401) {
                        this._ts.signOut();
                        this._rtr.navigate(['/sign-up']);
                    }
                },
            });
        } else {
            alert('CustomerID and ParticipantID are required');
        }
    }

    setCustomerData(ep: EscrowParticipant): EscrowParticipant {
        this._gfs.showLog('ViewEditCustomerProfile', 'formatPhone', 'EP:', ep);
        var rdata = new EscrowParticipant();
        if (ep && ep.customerID > 0 && ep.participantID > 0) {
            rdata.customerID = ep.customerID;
            rdata.participantID = ep.participantID;
            rdata.escrowOrderID = ep.escrowOrderID;

            //alert('rdata: ' + rdata.roleID + ' , ' + rdata.roleName);
            //alert('ep: ' + ep.roleID + ' , ' + ep.roleName);

            rdata.roleID = ep.roleID;
            rdata.roleName =
                ep.roleName != null && ep.roleName.length > 0
                    ? ep.roleName
                    : '';

            //alert('rdata: ' + rdata.roleID + ' , ' + rdata.roleName);
            //alert('ep: ' + ep.roleID + ' , ' + ep.roleName);

            rdata.firstName =
                ep.firstName != null && ep.firstName.length > 0
                    ? ep.firstName
                    : '';
            rdata.middleName =
                ep.middleName && ep.middleName.length > 0 ? ep.middleName : '';
            rdata.lastName =
                ep.lastName && ep.lastName.length > 0 ? ep.lastName : '';
            rdata.trackerDisplayAlias =
                ep.trackerDisplayAlias && ep.trackerDisplayAlias.length > 0
                    ? ep.trackerDisplayAlias
                    : '';
            rdata.company =
                ep.company != null && ep.company.length > 0 ? ep.company : '';
            rdata.title =
                ep.title != null && ep.title.length > 0 ? ep.title : '';
            rdata.address =
                ep.address != null && ep.address.length > 0 ? ep.address : '';
            rdata.address2 =
                ep.address2 != null && ep.address2.length > 0
                    ? ep.address2
                    : '';
            rdata.address3 =
                ep.address3 != null && ep.address3.length > 0
                    ? ep.address3
                    : '';
            rdata.city = ep.city != null && ep.city.length > 0 ? ep.city : '';

            // us state
            rdata.state =
                ep.state != null && ep.state.length > 0 ? ep.state : '';

            // canadian province
            rdata.province =
                ep.province != null && ep.province.length > 0
                    ? ep.province
                    : '';

            // region
            rdata.region =
                ep.region != null && ep.region.length > 0 ? ep.region : '';

            rdata.postal =
                ep.postal != null && ep.postal.length > 0 ? ep.postal : '';
            rdata.country =
                ep.country != null && ep.country.length > 0 ? ep.country : '';
            rdata.businessPhone =
                ep.businessPhone != null && ep.businessPhone.length > 0
                    ? ep.businessPhone
                          .replace('-', '')
                          .replace('(', '')
                          .replace(')', '')
                          .replace(' ', '')
                          .trim()
                    : '';
            rdata.extension =
                ep.extension != null && ep.extension.length > 0
                    ? ep.extension
                    : '';
            rdata.businessPhone2 =
                ep.businessPhone2 != null && ep.businessPhone2.length > 0
                    ? ep.businessPhone2
                          .replace('-', '')
                          .replace('(', '')
                          .replace(')', '')
                          .replace(' ', '')
                          .trim()
                    : '';
            rdata.extension2 =
                ep.extension2 != null && ep.extension2.length > 0
                    ? ep.extension2
                    : '';
            rdata.businessFax =
                ep.businessFax != null && ep.businessFax.length > 0
                    ? ep.businessFax
                          .replace('-', '')
                          .replace('(', '')
                          .replace(')', '')
                          .replace(' ', '')
                          .trim()
                    : '';
            rdata.homePhone =
                ep.homePhone != null && ep.homePhone.length > 0
                    ? ep.homePhone
                          .replace('-', '')
                          .replace('(', '')
                          .replace(')', '')
                          .replace(' ', '')
                          .trim()
                    : '';
            rdata.homePhone2 =
                ep.homePhone2 != null && ep.homePhone2.length > 0
                    ? ep.homePhone2
                          .replace('-', '')
                          .replace('(', '')
                          .replace(')', '')
                          .replace(' ', '')
                          .trim()
                    : '';
            rdata.homeFax =
                ep.homeFax != null && ep.homeFax.length > 0
                    ? ep.homeFax
                          .replace('-', '')
                          .replace('(', '')
                          .replace(')', '')
                          .replace(' ', '')
                          .trim()
                    : '';
            rdata.pager =
                ep.pager != null && ep.pager.length > 0
                    ? ep.pager
                          .replace('-', '')
                          .replace('(', '')
                          .replace(')', '')
                          .replace(' ', '')
                          .trim()
                    : '';
            rdata.cellPhone =
                ep.cellPhone != null && ep.cellPhone.length > 0
                    ? ep.cellPhone
                          .replace('-', '')
                          .replace('(', '')
                          .replace(')', '')
                          .replace(' ', '')
                          .trim()
                    : '';
            rdata.email =
                ep.email != null && ep.email.length > 0 ? ep.email : '';
            rdata.email2 =
                ep.email2 != null && ep.email2.length > 0 ? ep.email2 : '';
            rdata.email3 =
                ep.email3 != null && ep.email3.length > 0 ? ep.email3 : '';
            rdata.customerNotes =
                ep.customerNotes != null && ep.customerNotes.length > 0
                    ? ep.customerNotes
                    : '';

            rdata.sqs = ep.sqs != null && ep.sqs.length > 0 ? ep.sqs : '';
            rdata.staffFirstName =
                ep.staffFirstName != null && ep.staffFirstName.length > 0
                    ? ep.staffFirstName
                    : '';
            rdata.closingRoomAUP_AcceptDeclineDate =
                ep.closingRoomAUP_AcceptDeclineDate != null &&
                ep.closingRoomAUP_AcceptDeclineDate.length > 0
                    ? ep.closingRoomAUP_AcceptDeclineDate
                    : '';
            rdata.closingRoomUserID =
                ep.closingRoomUserID != null && ep.closingRoomUserID.length > 0
                    ? ep.closingRoomUserID
                    : '';
            rdata.gcrAgreementType =
                ep.gcrAgreementType != null && ep.gcrAgreementType.length > 0
                    ? ep.gcrAgreementType
                    : '';
            rdata.nNumber =
                ep.nNumber != null && ep.nNumber.length > 0 ? ep.nNumber : '';
            rdata.sn = ep.sn != null && ep.sn.length > 0 ? ep.sn : '';
            rdata.displayName =
                ep.displayName != null && ep.displayName.length > 0
                    ? ep.displayName
                    : '';
            rdata.notes =
                ep.notes != null && ep.notes.length > 0 ? ep.notes : '';
            rdata.addedByClosingRoomID =
                ep.addedByClosingRoomID != null &&
                ep.addedByClosingRoomID.length > 0
                    ? ep.addedByClosingRoomID
                    : '';
            rdata.playerName =
                ep.playerName != null && ep.playerName.length > 0
                    ? ep.playerName
                    : '';
            rdata.playerTitle =
                ep.playerTitle != null && ep.playerTitle.length > 0
                    ? ep.playerTitle
                    : '';
            rdata.playerDescription =
                ep.playerDescription != null && ep.playerDescription.length > 0
                    ? ep.playerDescription
                    : '';
            rdata.isChecked = ep.isChecked;
        }

        return rdata;
    }

    onCountryChange(): void {
        this._gfs.showLog(
            'ViewEditCustomerProfile',
            'onCountryChange',
            '',
            null
        );
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

    formatPhone(phone: string): string {
        this._gfs.showLog(
            'ViewEditCustomerProfile',
            'formatPhone',
            'phone:',
            phone
        );
        if (phone && phone.length > 0) {
            var phone2 = this.stripPhone(phone);
            if (phone2 && phone2.length > 0 && phone2.length <= 11) {
                this._gfs.showLog(
                    'ViewEditCustomerProfile',
                    'formatPhone',
                    'phone2:',
                    phone2
                );
                if (phone2.length == 11) {
                    return (
                        phone2.substring(0, 1) +
                        '-' +
                        phone2.substring(1, 4) +
                        '-' +
                        phone2.substring(4, 7) +
                        '-' +
                        phone2.substring(7, 11)
                    );
                } else if (phone2.length == 10) {
                    return (
                        '1-' +
                        phone2.substring(0, 3) +
                        '-' +
                        phone2.substring(3, 6) +
                        '-' +
                        phone2.substring(6, 10)
                    );
                } else if (phone2.length == 7) {
                    return (
                        phone2.substring(0, 3) + '-' + phone2.substring(3, 7)
                    );
                } else if (phone2.length <= 5) {
                    return phone2;
                }
            }
        }
        return phone;
    }

    stripPhone(phone: string): string {
        this._gfs.showLog(
            'ViewEditCustomerProfile',
            'stripPhone',
            'phone:',
            phone
        );
        if (phone && phone.length > 0) {
            return phone
                .replace('-', '')
                .replace('(', '')
                .replace(')', '')
                .replace(' ', '')
                .trim();
        }
        return phone;
    }

    onLastNameChanged(): void {
        this._gfs.showLog('ViewEditCustomerProfile', 'onLastNameChanged', '', null);

        if (this.daParticipant.lastName.length >= 4) {
            this.onParticipantSearch('lastname', this.daParticipant.lastName);
        }
    }

    onCompanyChanged(): void {
        this._gfs.showLog('ViewEditCustomerProfile', 'onCompanyChanged', '', null);

        if (this.daParticipant.company.length >= 4) {
            this.onParticipantSearch('company', this.daParticipant.company);
        }
    }

    onEmailChanged(): void {
        this._gfs.showLog('ViewEditCustomerProfile', 'onEmailChanged', '', null);

        if (this.daParticipant.email.length >= 4) {
            this.onParticipantSearch('email', this.daParticipant.email);
        }
    }

    onParticipantSearch(type: string, value: string): void {
        this._gfs.showLog('ViewEditCustomerProfile', 'onParticipantSearch', '', null);

        var par = new SearchParameters();
        if (type == 'lastname') par.lastName = value;
        if (type == 'company') par.company = value;
        if (type == 'email') par.email = value;

        this._par.getParticipants(par).subscribe({
            next: (result: any) => {
                this._gfs.showLog(
                    'ViewEditCustomerProfile',
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
                    'ViewEditCustomerProfile',
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
        this._gfs.showLog('ViewEditCustomerProfile', 'openParticipantResult', '', null);

        let dr = this._dialog.open(ParticipantSearchResultsComponent, {
            restoreFocus: false,
            disableClose: false,
        });

        dr.componentInstance.setParticipants(data);

        dr.afterClosed().subscribe((res) => {
            this._gfs.showLog(
                'ViewEditCustomerProfile',
                'openParticipantResult',
                'afterClose',
                res.data
            );
            this.populateForm(res.data);
        });
    }

    private populateForm(data: EscrowParticipant): void {
        this._gfs.showLog('ViewEditCustomerProfile', 'populateForm', '', null);

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

    private getCountries(): void {
        //this._gfs.showLog('ViewEditCustomerProfile', 'getCountries', '', null);

        this._ms.getCountries().subscribe({
            next: (result: any) => {
                //this._gfs.showLog('ViewEditCustomerProfile', 'getCountries', 'Respnse:', result);
                this.countries = result.data;
                this.countries.unshift({
                    id: '-1',
                    name: 'Please Select Country',
                });
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog(
                    'ViewEditCustomerProfile',
                    'getCountries',
                    'Error:',
                    err
                );
                if (err.status == 401) {
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-up']);
                }
            },
        });
    }

    private getUSStates(): void {
        //this._gfs.showLog('ViewEditCustomerProfile', 'getUSStates', '', null);

        this._ms.getUSStates().subscribe({
            next: (result: any) => {
                //this._gfs.showLog('ViewEditCustomerProfile', 'getUSStates', 'Response:', result);
                this.usstates = result.data;
                this.usstates.unshift({
                    id: '-1',
                    name: 'Please Select State',
                });
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog(
                    'ViewEditCustomerProfile',
                    'getUSStates',
                    'Error:',
                    err
                );
                if (err.status == 401) {
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-up']);
                }
            },
        });
    }

    private getCanadianStates(): void {
        //this._gfs.showLog('ViewEditCustomerProfile', 'getCanadianStates', '', null);

        this._ms.getCanadianStates().subscribe({
            next: (result: any) => {
                //this._gfs.showLog('ViewEditCustomerProfile', 'getCanadianStates', 'Response:', result);
                this.canadianstates = result.data;
                this.canadianstates.unshift({
                    id: '-1',
                    name: 'Please Select Canadian State',
                });
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog(
                    'ViewEditCustomerProfile',
                    'getCanadianStates',
                    'Error:',
                    err
                );
                if (err.status == 401) {
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-up']);
                }
            },
        });
    }

    private getRoles(): void {
        //this._gfs.showLog('ViewEditCustomerProfile', 'getRoles', '', null);

        this._eois.getEscrowRoleParticipants().subscribe({
            next: (result: any) => {
                //this._gfs.showLog('ViewEditCustomerProfile', 'getRoles', 'Response:', result);
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
                this._gfs.showLog(
                    'ViewEditCustomerProfile',
                    'getRoles',
                    'Error:',
                    err
                );
                if (err.status == 401) {
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-up']);
                }
            },
        });
    }
}
