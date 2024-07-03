import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-healthcensus',
    standalone   : true,
    templateUrl  : './ad-healthcensus.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADHealthCensusComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADHealthCensusComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}