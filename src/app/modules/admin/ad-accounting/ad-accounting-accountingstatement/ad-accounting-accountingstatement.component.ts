import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-accounting-accountingstatement',
    standalone   : true,
    templateUrl  : './ad-accounting-accountingstatement.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADAccountingAccountingStatementComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADAccountingAccountingStatementComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}