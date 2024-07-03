import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-stdc-bootstrap',
    standalone   : true,
    templateUrl  : './ad-stdc-bootstrap.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADSTDCBootstrapComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADSTDCBootstrapComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}