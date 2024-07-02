import { NgIf, CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { EscrowParticipant } from "app/modules/_modules/escrowclasses";
import { StringListItem } from "app/modules/_modules/serviceclasses";
import { AircraftService } from "app/modules/_services/acftinfo.service";
import { GlobalFunctionsService } from "app/modules/_services/gfinfo.service";
import { TokenStorageService } from "app/modules/_services/tsinfo.service";

@Component({
    selector: 'send-email-escrow-detail',
      standalone: true,
      templateUrl: './send-email-escrow-detail.component.html',
      encapsulation: ViewEncapsulation.None,
      imports: [NgIf, CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatPaginatorModule, MatSortModule, MatTableModule],
  })
  export class SendEmailEscrowDetailComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = 0;
    eplayers: EscrowParticipant[] = [];
    availableList: StringListItem[] = [];
    selectedUser: string = "";
    sendAll: string = "";
    showData: boolean = false;
    buttonLocked: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _acservice: AircraftService,
        private _dialog: MatDialog,
        private _dialogRef: MatDialogRef<SendEmailEscrowDetailComponent>,) 
    {
        this._gfs.showLog('SendEmailEscrowDetail', 'constructor', '', null);
        this._gfs.allowCall = false;
    }

    ngAfterViewInit(): void {
        this._gfs.showLog('SendEmailEscrowDetail', 'ngAfterViewInit', '', null);
        this.getUserList();
        
    }
    
    ngOnInit(): void {
        this._gfs.showLog('SendEmailEscrowDetail', 'ngOnInit', '', null);
    }

    setData(eid: number, elist: EscrowParticipant[]): void {
        this._gfs.showLog('SendEmailEscrowDetail', 'setData', '', null);
        this._gfs.showLog('SendEmailEscrowDetail', 'setData', 'eid:', eid);
        this._gfs.showLog('SendEmailEscrowDetail', 'setData', 'elist:', elist);
        
        this.escrowOrderID = eid;  
        this.eplayers = elist;  
                
    }

    sendEmail(): void {
        this._gfs.showLog('SendEmailEscrowDetail', 'sendEmail', '', null);

        var emails = '';
    
        if(this.selectedUser.length == 0) {
            alert('Please Select An Email');
        }
        else {
            if(this.selectedUser.indexOf('Send All') >= 0) {
                emails = this.sendAll;
            }
            else{
                emails = this.selectedUser;
            }
    
            var daemail = emails.toString();
            if(daemail.length > 0){
                var re = /,/gi;
                var q = daemail.replace(re, ";");
                q = q + ";";
                this._gfs.showLog('SendEmailEscrowDetail', 'sendEmail', 'q:', q);
                var uurrl = "mailto:" + q + "?subject=Virtual Closing Email";
                this._gfs.showLog('SendEmailEscrowDetail', 'sendEmail', 'uurrl:', uurrl);
                window.open(uurrl, '_blank')?.focus();
            }
        
            this.selectedUser = "";
            this._dialogRef.close();
    
        }   
    }

    getUserList(): void {
        this._gfs.showLog('SendEmailEscrowDetail', 'getUserList', '', null);

        this.availableList = [];
        this.showData = false;
        
        if(this.eplayers != null && this.eplayers.length > 0){
          this.showData = true;
          this.eplayers.forEach(u => this.availableList.push({ id: u.userInfo.email, name: u.playerName }));
          this.sendAll = this.availableList.map(u => u.id).join(', ');
          this.availableList.unshift({id: "Send All", name: "Send All"});
        }
    
    /*
        this.availableList = [
          {id: "gweston@aictitle.com", name: "Alpha"}, 
          {id: "rjeffries@aictitle.com", name: "Beta"},
          {id: "dreherman@aictitle.com", name: "Gamma"}, 
          {id: "bwilliams@aictitle.com", name: "Delta"}
        ];
    
        this.sendAll = this.availableList.map(u => u.id).join(', ');
        
        this.availableList.unshift({id: "Send All", name: "Send All"});
    */
    
    }
    
    onSelectedUserChanged(): void {
        this._gfs.showLog('SendEmailEscrowDetail', 'onSelectedUserChanged', '', null);
    }

  }