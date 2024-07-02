import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-admin-rpsqueue',
    standalone   : true,
    templateUrl  : './ad-admin-rpsqueue.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADAdminRPSQueueComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADAdminRPSQueueComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}