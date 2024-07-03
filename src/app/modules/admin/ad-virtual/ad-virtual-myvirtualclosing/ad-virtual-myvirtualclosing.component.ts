import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-virtual-myvirtualclosing',
    standalone   : true,
    templateUrl  : './ad-virtual-myvirtualclosing.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADVirtualMyVirtualClosingComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADVirtualMyVirtualClosingComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}