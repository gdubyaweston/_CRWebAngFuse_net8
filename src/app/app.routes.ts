import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { ADEODetailComponent } from './modules/admin/ad-eodetail/ad-eodetail.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'ad-home'},

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'ad-home'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {path: 'ad-search-customer-show', loadChildren: () => import('app/modules/admin/ad-search/ad-search-customers/ad-search-customer-show/ad-search-customer-show.routes')},
            {path: 'ad-hc-censusresults', loadChildren: () => import('app/modules/admin/ad-healthcensus/ad-hc-censusresults/ad-hc-censusresults.routes')},
            {path: 'ad-hc-employeecensus', loadChildren: () => import('app/modules/admin/ad-healthcensus/ad-hc-employeecensus/ad-hc-employeecensus.routes')},
            {path: 'ad-stdc-bootstrap', loadChildren: () => import('app/modules/admin/ad-sampletemplate/ad-stdc-bootstrap/ad-stdc-bootstrap.routes')},
            {path: 'ad-stdc-fontawesome', loadChildren: () => import('app/modules/admin/ad-sampletemplate/ad-stdc-fontawesome/ad-stdc-fontawesome.routes')},
            {path: 'ad-stdc-googlefonts', loadChildren: () => import('app/modules/admin/ad-sampletemplate/ad-stdc-googlefonts/ad-stdc-googlefonts.routes')},
            {path: 'ad-stdc-latestversion', loadChildren: () => import('app/modules/admin/ad-sampletemplate/ad-stdc-latestversion/ad-stdc-latestversion.routes')},
            {path: 'ad-stdc-more', loadChildren: () => import('app/modules/admin/ad-sampletemplate/ad-stdc-more/ad-stdc-more.routes')},
            {path: 'ad-virtual-acrprodtest', loadChildren: () => import('app/modules/admin/ad-virtual/ad-virtual-acrprodtest/ad-virtual-acrprodtest.routes')},
            {path: 'ad-virtual-acrproduction', loadChildren: () => import('app/modules/admin/ad-virtual/ad-virtual-acrproduction/ad-virtual-acrproduction.routes')},
            {path: 'ad-virtual-aicvirtualclosing', loadChildren: () => import('app/modules/admin/ad-virtual/ad-virtual-aicvirtualclosing/ad-virtual-aicvirtualclosing.routes')},
            {path: 'ad-virtual-aicvirtualclosingprodtest', loadChildren: () => import('app/modules/admin/ad-virtual/ad-virtual-aicvirtualclosingprodtest/ad-virtual-aicvirtualclosingprodtest.routes')},
            {path: 'ad-virtual-dev', loadChildren: () => import('app/modules/admin/ad-virtual/ad-virtual-dev/ad-virtual-dev.routes')},
            {path: 'ad-virtual-global', loadChildren: () => import('app/modules/admin/ad-virtual/ad-virtual-global/ad-virtual-global.routes')},
            {path: 'ad-virtual-globalprodtest', loadChildren: () => import('app/modules/admin/ad-virtual/ad-virtual-globalprodtest/ad-virtual-globalprodtest.routes')},
            {path: 'ad-virtual-myglobalvirtual', loadChildren: () => import('app/modules/admin/ad-virtual/ad-virtual-myglobalvirtual/ad-virtual-myglobalvirtual.routes')},
            {path: 'ad-virtual-mytextronvirtual', loadChildren: () => import('app/modules/admin/ad-virtual/ad-virtual-mytextronvirtual/ad-virtual-mytextronvirtual.routes')},
            {path: 'ad-virtual-myvirtualclosing', loadChildren: () => import('app/modules/admin/ad-virtual/ad-virtual-myvirtualclosing/ad-virtual-myvirtualclosing.routes')},
            {path: 'ad-virtual-sandbox', loadChildren: () => import('app/modules/admin/ad-virtual/ad-virtual-sandbox/ad-virtual-sandbox.routes')},            
            {path: 'ad-admin-manageusers', loadChildren: () => import('app/modules/admin/ad-admin/ad-admin-manageusers/ad-admin-manageusers.routes')},
            {path: 'ad-admin-roles', loadChildren: () => import('app/modules/admin/ad-admin/ad-admin-roles/ad-admin-roles.routes')},
            {path: 'ad-admin-rpsqueue', loadChildren: () => import('app/modules/admin/ad-admin/ad-admin-rpsqueue/ad-admin-rpsqueue.routes')},
            {path: 'ad-admin-userlist', loadChildren: () => import('app/modules/admin/ad-admin/ad-admin-userlist/ad-admin-userlist.routes')},
            {path: 'ad-manage-onespan', loadChildren: () => import('app/modules/admin/ad-manage/ad-manage-onespan/ad-manage-onespan.routes')},
            {path: 'ad-accounting-accountingstatement', loadChildren: () => import('app/modules/admin/ad-accounting/ad-accounting-accountingstatement/ad-accounting-accountingstatement.routes')},
            {path: 'ad-accounting-closingstatement', loadChildren: () => import('app/modules/admin/ad-accounting/ad-accounting-closingstatement/ad-accounting-closingstatement.routes')},
            {path: 'ad-search-orders', loadChildren: () => import('app/modules/admin/ad-search/ad-search-orders/ad-search-orders.routes')},
            {path: 'ad-search-customers', loadChildren: () => import('app/modules/admin/ad-search/ad-search-customers/ad-search-customers.routes')},
            {path: 'ad-closingroom/ad-cr-test1', loadChildren: () => import('app/modules/admin/ad-closingroom/ad-closingroom.routes')},
            {path: 'ad-cr-search', loadChildren: () => import('app/modules/admin/ad-closingroom/ad-cr-search/ad-cr-search.routes')},
            {path: 'ad-cr-all', loadChildren: () => import('app/modules/admin/ad-closingroom/ad-cr-all/ad-cr-all.routes')},
            {path: 'ad-cr-open', loadChildren: () => import('app/modules/admin/ad-closingroom/ad-cr-open/ad-cr-open.routes')},
            {path: 'ad-cr-closed', loadChildren: () => import('app/modules/admin/ad-closingroom/ad-cr-closed/ad-cr-closed.routes')},
            {path: 'ad-closingroom', loadChildren: () => import('app/modules/admin/ad-closingroom/ad-closingroom.routes')},
            {path: 'ad-home', loadChildren: () => import('app/modules/admin/ad-home/ad-home.routes')},
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.routes')},
        ]
    },

    {
        path: 'ad-eodetail/:escrowOrderID',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: ADEODetailComponent,
        resolve: {
            initialData: initialDataResolver,
            loadChildren: () => import('app/modules/admin/ad-eodetail/ad-eodetail.routes')
        },
        children: [
            
        ]
    }
];
