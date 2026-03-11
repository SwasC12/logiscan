import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'scan',
    pathMatch: 'full'
  },
  {
    path: 'scan',
    loadComponent: () => import('./pages/scan/scan.component').then(m => m.ScanComponent)
  },
  {
    path: 'history',
    loadComponent: () => import('./pages/history/history.component').then(m => m.HistoryComponent)
  },
  {
    path: 'waybill',
    loadComponent: () => import('./pages/waybill/waybill-list.component').then(m => m.WaybillListComponent)
  },
  {
    path: 'waybill/new',
    loadComponent: () => import('./pages/waybill/waybill-new.component').then(m => m.WaybillNewComponent)
  },
  {
    path: 'waybill/:id',
    loadComponent: () => import('./pages/waybill/waybill-detail.component').then(m => m.WaybillDetailComponent)
  }
];
