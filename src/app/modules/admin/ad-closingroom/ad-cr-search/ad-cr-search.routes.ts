import { Routes } from '@angular/router';
import { ADClosingRoomComponent } from 'app/modules/admin/ad-closingroom/ad-closingroom.component';

import { ADCRSearchComponent } from './ad-cr-search.component';

//import { ADCRClosedComponent } from 'app/modules/admin/ad-closingroom/ad-cr-closing/ad-cr-closing.component';

export default [
    {
        path     : '',
        component: ADCRSearchComponent,
    },    
] as Routes;