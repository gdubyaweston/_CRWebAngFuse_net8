import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-virtual-mytextronvirtual',
    standalone   : true,
    templateUrl  : './ad-virtual-mytextronvirtual.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADVirtualMyTextronVirtualComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADVirtualMyTextronVirtualComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}