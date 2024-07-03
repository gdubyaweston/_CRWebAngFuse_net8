import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-manage-onespan',
    standalone   : true,
    templateUrl  : './ad-manage-onespan.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADManageOneSpanComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADManageOneSpanComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}