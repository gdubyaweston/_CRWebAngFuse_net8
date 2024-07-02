/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'ad-home',
        title: 'Home',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/ad-home'
    },
    {
        id   : 'ad-closingroom',
        title: 'Closing Room',
        type : 'collapsable',
        icon : 'heroicons_outline:chart-bar',
        //link : '/ad-closingroom',
        children: [
            {
                id   : 'ad-cr-open',
                title: 'Open',
                type : 'basic',
                //attributes: { hidden: true },
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-cr-open'
                //link : '/ad-closingroom/1'
            },
            {
                id   : 'ad-cr-closed',
                title: 'Closed',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-cr-closed'
            },
            {
                id   : 'ad-cr-all',
                title: 'All',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-cr-all'
            },
            {
                id   : 'ad-cr-search',
                title: 'Search',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-cr-search'
            }
        ]
    },
    {
        id   : 'ad-search',
        title: 'Search',
        type : 'collapsable',
        icon : 'heroicons_outline:camera',
        //link : '/example',
        // <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M2 6a2 2 0 0 1 2-2h5l2 2h5a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/></svg>
        children: [
            {
                id   : 'ad-search-customers',
                title: 'Customers',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-search-customers'
            },
            {
                id   : 'ad-search-orders',
                title: 'Orders',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-search-orders'
            }
        ]
    },
    {
        id   : 'ad-admin',
        title: 'Admin',
        type : 'collapsable',
        icon : 'heroicons_outline:user',
        //link : '/example',
        children: [
            {
                id   : 'ad-admin-manageusers',
                title: 'Manage Users',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-admin-manageusers'
            },
            {
                id   : 'ad-admin-userlist',
                title: 'User List',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-admin-userlist'
            },
            {
                id   : 'ad-admin-roles',
                title: 'Roles',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-admin-roles'
            },
            {
                id   : 'ad-admin-rpsqueue',
                title: 'RPS Queue',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-admin-rpsqueue'
            }
        ]
    },
    /*
    {
        id   : 'ad-accounting',
        title: 'Accounting',
        type : 'collapsable',
        icon : 'heroicons_outline:calculator',        
        //link : '/example',
        children: [
            {
                id   : 'ad-accounting-closingstatement',
                title: 'Closing Statement',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-accounting-closingstatement'
            },
            {
                id   : 'ad-accounting-accountingstatement',
                title: 'Accounting Statement',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-accounting-accountingstatement'
            }
        ]
    },
    {
        id   : 'ad-manage',
        title: 'Manage',
        type : 'collapsable',
        icon : 'heroicons_outline:square-3-stack-3d',
        //link : '/example',
        children: [
            {
                id   : 'ad-manage-onespan',
                title: 'One Span',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-manage-onespan'
            }
        ]
    },
    
    {
        id   : 'ad-virtual',
        title: 'Virtual Closing Urls',
        type : 'collapsable',
        icon : 'heroicons_outline:circle-stack',
        //link : '/example',
        children: [
            {
                id   : 'ad-virtual-accproduction',
                title: 'ACR Production',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-virtual-acrproduction'
            },
            {
                id   : 'ad-virtual-acrprodtest',
                title: 'ACR Prodtest',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-virtual-acrprodtest'
            },
            {
                id   : 'ad-virtual-aicvirtualclosing',
                title: 'AIC Virtual Closing',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-virtual-aicvirtualclosing'
            },
            {
                id   : 'ad-virtual-aicvirtualclosingprodtest',
                title: 'AIC Virtual Closing Prodtest',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-virtual-aicvirtualclosingprodtest'
            },
            {
                id   : 'ad-virtual-global',
                title: 'Global',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-virtual-global'
            },
            {
                id   : 'ad-virtual-globalprodtest',
                title: 'Global Prodtest',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-virtual-globalprodtest'
            },
            {
                id   : 'ad-virtual-dev',
                title: 'Dev',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-virtual-dev'
            },
            {
                id   : 'ad-virtual-sandbox',
                title: 'Sandbox',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-virtual-sandbox'
            },
            {
                id   : 'ad-virtual-myvirtualclosing',
                title: 'My Virtual Closing (localhost)',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-virtual-myvirtualclosing'
            },
            {
                id   : 'ad-virtual-myglobalvirtual',
                title: 'My Global Virtual Closing (localhost)',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-virtual-myglobalvirtual'
            },
            {
                id   : 'ad-virtual-mytextronvirtual',
                title: 'My Textron Virtual Closing (localhost)',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-virtual-mytextronvirtual'
            },
        ]
    },
    {
        id   : 'ad-sampletemplate',
        title: 'Sample Template and Dashboard Component',
        type : 'collapsable',
        icon : 'heroicons_outline:bolt',
        //link : '/example',
        children: [
            {
                id   : 'ad-stdc-latestversion',
                title: 'Latest Version',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-stdc-latestversion'
            },
            {
                id   : 'ad-stdc-fontawesome',
                title: 'Font Awesone',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-stdc-fontawesome'
            },
            {
                id   : 'ad-stdc-googlefonts',
                title: 'Google Fonts',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-stdc-googlefonts'
            },
            {
                id   : 'ad-stdc-bootstrap',
                title: 'Bootstrap',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-stdc-bootstrap'
            },
            {
                id   : 'ad-stdc-more',
                title: 'More',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-stdc-more'
            },
        ]
    },
    {
        id   : 'ad-healthcensus',
        title: 'Health Census',
        type : 'collapsable',
        icon : 'heroicons_outline:heart',
        //link : '/example',
        children: [
            {
                id   : 'ad-hc-employeecensus',
                title: 'Employee Census',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-hc-employeecensus'
            },
            {
                id   : 'ad-hc-censusresults',
                title: 'Census Results',
                type : 'basic',
                //icon : 'heroicons_outline:folder-arrow-down',
                link : '/ad-hc-censusresults'
            },
        ]
    },*/
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
/* 

export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'ad-home',
        title: 'Home',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/ad-home'
    },
    {
        id   : 'ad-closingroom',
        title: 'Closing Room',
        type : 'basic',
        icon : 'heroicons_outline:folder-arrow-down',
        link : '/ad-closingroom'
    },
    {
        id   : 'ad-cr-test',
        title: 'Closing Room Test',
        type : 'basic',
        icon : 'heroicons_outline:folder-arrow-down',
        link : '/ad-cr-test'
    },
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];

*/

