import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-stdc-fontawesome',
    standalone   : true,
    templateUrl  : './ad-stdc-fontawesome.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADSTDCFontAwesomeComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADSTDCFontAwesomeComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}