import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-admin-roles',
    standalone   : true,
    templateUrl  : './ad-admin-roles.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADAdminRolesComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADAdminRolesComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}