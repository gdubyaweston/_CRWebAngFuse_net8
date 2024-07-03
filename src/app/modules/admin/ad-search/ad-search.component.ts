import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-search',
    standalone   : true,
    templateUrl  : './ad-search.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADSearchComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADSearchComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}