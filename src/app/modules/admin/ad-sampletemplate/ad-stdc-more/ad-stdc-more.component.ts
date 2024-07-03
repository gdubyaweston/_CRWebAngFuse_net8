import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-stdc-more',
    standalone   : true,
    templateUrl  : './ad-stdc-more.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADSTDCMoreComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADSTDCMoreComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}