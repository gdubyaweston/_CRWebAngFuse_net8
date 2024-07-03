import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-virtual-acrproduction',
    standalone   : true,
    templateUrl  : './ad-virtual-acrproduction.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADVirtualACRProductionComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADVirtualACRProductionComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}