import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-hc-employeecensus',
    standalone   : true,
    templateUrl  : './ad-hc-employeecensus.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADHCEmployeeCensusComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADHCEmployeeCensusComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}