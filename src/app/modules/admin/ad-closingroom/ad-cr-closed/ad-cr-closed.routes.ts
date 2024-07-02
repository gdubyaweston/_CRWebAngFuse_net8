import { Routes } from '@angular/router';
import { ADClosingRoomComponent } from 'app/modules/admin/ad-closingroom/ad-closingroom.component';

import { ADCRClosedComponent } from './ad-cr-closed.component';

//import { ADCRClosedComponent } from 'app/modules/admin/ad-closingroom/ad-cr-closing/ad-cr-closing.component';

export default [
    {
        path     : '',
        component: ADCRClosedComponent,
    },    
] as Routes;