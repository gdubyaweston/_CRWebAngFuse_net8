import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-hc-censusresults',
    standalone   : true,
    templateUrl  : './ad-hc-censusresults.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADHCCensusResultsComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADHCCensusResultsComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}