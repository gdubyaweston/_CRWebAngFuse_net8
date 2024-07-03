import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-stdc-latestversion',
    standalone   : true,
    templateUrl  : './ad-stdc-latestversion.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADSTDCLatestVersionComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADSTDCLatestVersionComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}