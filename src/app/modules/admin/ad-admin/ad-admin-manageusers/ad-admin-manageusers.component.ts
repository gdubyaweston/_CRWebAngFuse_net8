import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-admin-manageusers',
    standalone   : true,
    templateUrl  : './ad-admin-manageusers.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADAdminManageUsersComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADAdminManageUsersComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}