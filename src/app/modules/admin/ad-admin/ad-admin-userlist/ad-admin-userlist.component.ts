import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-admin-userlist',
    standalone   : true,
    templateUrl  : './ad-admin-userlist.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADAdminUserListComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADAdminUserListComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}