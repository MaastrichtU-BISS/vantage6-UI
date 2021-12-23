import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AccessGuard } from './access-guard.guard';
import { OrganizationComponent } from './organization/organization.component';
import { ModalNewUserComponent } from './organization/modal-new-user/modal-new-user/modal-new-user.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { requiresLogin: true },
    canActivate: [AccessGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'organization',
    component: OrganizationComponent,
    data: {
      requiresLogin: true,
      permissionType: 'view',
      permissionResource: 'organization',
    },
    canActivate: [AccessGuard],
  },
  {
    path: 'user/create',
    component: ModalNewUserComponent,
    data: {
      requiresLogin: true,
      permissionType: 'create',
      permissionResource: 'user',
    },
    canActivate: [AccessGuard],
  },
];
//TODO add * path with 404 not found page

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
