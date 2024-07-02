import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-accounting',
    standalone   : true,
    templateUrl  : './ad-accounting.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADAccountingComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADAccountingComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}