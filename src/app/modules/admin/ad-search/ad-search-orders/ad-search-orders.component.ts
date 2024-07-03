import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-search-orders',
    standalone   : true,
    templateUrl  : './ad-search-orders.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADSearchOrdersComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADSearchOrdersComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}