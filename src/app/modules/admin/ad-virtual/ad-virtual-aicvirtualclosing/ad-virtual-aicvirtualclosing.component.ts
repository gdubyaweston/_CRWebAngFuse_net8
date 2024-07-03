import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-virtual-aicvirtualclosing',
    standalone   : true,
    templateUrl  : './ad-virtual-aicvirtualclosing.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADVirtualAICVirtualClosingComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADVirtualAICVirtualClosingComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}