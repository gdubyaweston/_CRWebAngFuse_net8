import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-virtual-globalprodtest',
    standalone   : true,
    templateUrl  : './ad-virtual-globalprodtest.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADVirtualGlobalProdTestComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADVirtualGlobalProdTestComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}