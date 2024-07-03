import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-virtual-dev',
    standalone   : true,
    templateUrl  : './ad-virtual-dev.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADVirtualDevComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADVirtualDevComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}