import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-manage',
    standalone   : true,
    templateUrl  : './ad-manage.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADManageComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADManageComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}