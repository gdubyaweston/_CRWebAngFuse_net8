import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-virtual-aicvirtualclosingprodtest',
    standalone   : true,
    templateUrl  : './ad-virtual-aicvirtualclosingprodtest.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADVirtualAICVirtualClosingProdTestComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADVirtualAICVirtualClosingProdTestComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}