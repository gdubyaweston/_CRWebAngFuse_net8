import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-virtual-acrprodtest',
    standalone   : true,
    templateUrl  : './ad-virtual-acrprodtest.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADVirtualACRProdTestComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADVirtualACRProdTestComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}