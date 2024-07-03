import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalFunctionsService } from 'app/modules/_services/gfinfo.service';

@Component({
    selector     : 'ad-sampletemplate',
    standalone   : true,
    templateUrl  : './ad-sampletemplate.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ADSampleTemplateComponent
{

    _gfs: GlobalFunctionsService = new GlobalFunctionsService();

    /**
     * Constructor
     */
    constructor()
    {
        this._gfs.showLog('ADSampleTemplateComponent', 'constructor', '', null);
        this._gfs.allowCall = false;
    }
}