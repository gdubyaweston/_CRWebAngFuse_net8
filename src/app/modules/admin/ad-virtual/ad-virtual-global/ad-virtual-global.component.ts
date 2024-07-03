import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-virtual-global',
    standalone   : true,
    templateUrl  : './ad-virtual-global.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADVirtualGlobalComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADVirtualGlobalComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}