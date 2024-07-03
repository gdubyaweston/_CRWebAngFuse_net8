import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-virtual',
    standalone   : true,
    templateUrl  : './ad-virtual.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADVirtualComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADVirtualComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}