import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { OrganizationInfoComponent } from './pages/organization-info/organization-info.component';
import { UpdateComponent } from './pages/update/update.componet';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'organization-info',
    component: OrganizationInfoComponent,
  },
  {
    path: 'update',
    component: UpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
