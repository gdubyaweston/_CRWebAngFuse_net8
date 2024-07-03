import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-virtual-myglobalvirtual',
    standalone   : true,
    templateUrl  : './ad-virtual-myglobalvirtual.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADVirtualMyGlobalVirtualComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADVirtualMyGlobalVirtualComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}