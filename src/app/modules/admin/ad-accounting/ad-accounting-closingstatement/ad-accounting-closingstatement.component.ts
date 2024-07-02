import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-accounting-closingstatement',
    standalone   : true,
    templateUrl  : './ad-accounting-closingstatement.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADAccountingClosingStatementComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADAccountingClosingStatementComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}