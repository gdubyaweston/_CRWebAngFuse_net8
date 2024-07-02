import { CommonModule, NgIf } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from "app/modules/_services/tsinfo.service";
import { EscrowOrderInfoService } from "app/modules/_services/eoinfo.service";
import { EscrowParams, EscrowParticipant, EscrowRole } from "app/modules/_modules/escrowclasses";
import { MatButtonModule } from '@angular/material/button';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';
import { PlayerInfoService } from "app/modules/_services/playinfo.service";

@Component({
    selector: 'create-linked-order',
    standalone: true,
    templateUrl: './create-linked-order.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [NgIf, CommonModule, MatDialogModule, MatButtonModule],
})
export class CreateLinkedOrderComponent {

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    escrowOrderID: number = 0;    
    
    players: Array<EscrowParticipant>;
    selectedPlayers: Array<EscrowParticipant>;
    isSelectAll: boolean;
    roleList: Array<EscrowRole>;
    btnCopySelectedState: boolean = true;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _httpClient: HttpClient,
        private _rtr: Router,
        private _ts: TokenStorageService,
        private _eos: EscrowOrderInfoService,
        private _ps: PlayerInfoService,
        public _dialogRef: MatDialogRef<CreateLinkedOrderComponent>,
        ) 
    {
        this._gfs.showLog('CreateLinkedOrder', 'constructor', '', null);
        this._gfs.allowCall = false;         
    }

    ngOnInit(): void {
        this._gfs.showLog('CreateLinkedOrder', 'ngOnInit', '', null);
        this.getOrderInfo();
    }

    setData(eid: number): void {
        this._gfs.showLog('CreateLinkedOrder', 'setData', '', null);
        this.escrowOrderID = eid; 
    }

    getOrderInfo(): void{
        this._gfs.showLog('CreateLinkedOrder', 'getOrderInfo', '', null);
        
        var epdto = new EscrowParams();
        epdto.escrowOrderID = this.escrowOrderID;
      
         //alert(this.escrowOrderID);
        this.players = new Array<EscrowParticipant>();
  
        this._ps.getPlayers(epdto).subscribe({
            next: (ret: any) => {
                if(ret.success){
                    this._gfs.showLog('CreateLinkedOrder', 'getOrderInfo', 'Return Success:', ret);
                    this.players = ret.data;
                }
                else{
                    this._gfs.showLog('CreateLinkedOrder', 'getOrderInfo', 'Return Failur:', ret);
                }                    
            },
            error: (err: HttpErrorResponse) => {
                this._gfs.showLog('CreateLinkedOrder', 'getOrderInfo', 'Error:', err);
                if(err.status == 401){
                    this._ts.signOut();
                    this._rtr.navigate(['/sign-in']);
                }
            }
        }); 
    }

    copySelected(): void{
        this._gfs.showLog('CreateLinkedOrder', 'copySelected', '', null);
        
        var anySelected = this.players.some(p => p.isChecked == true);
        if(anySelected){
            var selectedPlayers = this.players.filter(pp => pp.isChecked == true);
            this._gfs.showLog('CreateLinkedOrder', 'copySelected', 'Selected Players:', selectedPlayers);
            
            var epdto = new EscrowParams();
            epdto.escrowOrderID = this.escrowOrderID;
            epdto.playerList = this.populateRoles(selectedPlayers);
            this._gfs.showLog('CreateLinkedOrder', 'copySelected', 'Escrow Params:', epdto);
            
            this._eos.copyEscrow(epdto).subscribe({
                next: (ret: any) => {
                    if(ret.success){
                        this._gfs.showLog('CreateLinkedOrder', 'copySelected', 'Return Success:', ret);
                        this._dialogRef.close(ret.data);
                        //this.players = ret.data;
                    }
                    else{
                        this._gfs.showLog('CreateLinkedOrder', 'copySelected', 'Return False:', ret);
                    }
                      
                },
                error: (err: HttpErrorResponse) => {
                    this._gfs.showLog('CreateLinkedOrder', 'copySelected', 'Error:', err);
                    if(err.status == 401){
                        this._ts.signOut();
                        this._rtr.navigate(['/sign-in']);
                    }
                }
            });
  
        }  
    }

    populateRoles(incoming: Array<EscrowParticipant>): Array<EscrowParticipant> {
        this._gfs.showLog('CreateLinkedOrder', 'populateRoles', '', null);
        
        var outgoing = new Array<EscrowParticipant>();
        if(incoming != null && incoming.length > 0){
          
          incoming.forEach(element => {
            var np = new EscrowParticipant();
            np.setLinkedOrderData(element.participantID, element.escrowOrderID, element.customerID, element.roleID, element.trackerDisplayAlias);
            outgoing.push(np);
            
          });
        }
        return outgoing;
    }
   

}