import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-admin',
    standalone   : true,
    templateUrl  : './ad-admin.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADAdminComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADAdminComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}