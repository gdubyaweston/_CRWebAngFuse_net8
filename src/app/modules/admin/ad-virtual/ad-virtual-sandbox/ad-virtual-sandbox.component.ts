import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-virtual-sandbox',
    standalone   : true,
    templateUrl  : './ad-virtual-sandbox.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADVirtualSandboxComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADVirtualSandboxComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}