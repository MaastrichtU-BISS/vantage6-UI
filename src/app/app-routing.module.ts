import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OpsType, ResType, ScopeType } from './shared/enum';
import {
  AccessGuard,
  AccessGuardByOrgId,
  OrgAccessGuard,
} from 'src/app/auth/access-guard.guard';

import { HomeComponent } from './components/home/home.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { UserEditComponent } from './components/edit/user-edit/user-edit.component';
import { RoleEditComponent } from './components/edit/role-edit/role-edit.component';
import { OrganizationEditComponent } from './components/edit/organization-edit/organization-edit.component';
import { CollaborationEditComponent } from './components/edit/collaboration-edit/collaboration-edit.component';
import { RoleTableComponent } from './components/table/role-table/role-table.component';
import { UserTableComponent } from './components/table/user-table/user-table.component';
import { NodeTableComponent } from './components/table/node-table/node-table.component';
import { CollaborationViewSingleComponent } from './components/view-single/collaboration-view-single/collaboration-view-single.component';
import { TaskTableComponent } from './components/table/task-table/task-table.component';
import { TaskViewSingleComponent } from './components/view-single/task-view-single/task-view-single.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CollaborationTableComponent } from './components/table/collaboration-table/collaboration-table.component';
import { RoleViewSingleComponent } from './components/view-single/role-view-single/role-view-single.component';
import { UserViewSingleComponent } from './components/view-single/user-view-single/user-view-single.component';
import { NodeSingleViewComponent } from './components/view-single/node-single-view/node-single-view.component';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { TaskCreateComponent } from './components/edit/task-create/task-create.component';
import { SocketMessagesComponent } from './components/table/socket-messages/socket-messages.component';
import { StartComponent } from './components/start/start.component';
import { routeConfig, routePaths } from './routes';

const routes: Routes = [
  { path: '', redirectTo: routePaths.start, pathMatch: 'full' },
  {
    path: routeConfig.login,
    component: LoginPageComponent,
  },
  {
    path: routeConfig.profile,
    component: ProfileComponent,
    data: { requiresLogin: true },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.passwordLost,
    component: LoginPageComponent,
  },
  {
    path: routeConfig.passwordRecover,
    component: LoginPageComponent,
  },
  {
    path: routeConfig.setupMFA,
    component: LoginPageComponent,
  },
  {
    path: routeConfig.codeMFA,
    component: LoginPageComponent,
  },
  {
    path: routeConfig.lostMFA,
    component: LoginPageComponent,
  },
  {
    path: routeConfig.recoverMFA,
    component: LoginPageComponent,
  },
  {
    path: routeConfig.start,
    component: StartComponent,
    data: { requiresLogin: true, fullLayout: true },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.home,
    component: HomeComponent,
    data: { requiresLogin: true },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.organizationCreate,
    component: OrganizationEditComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.CREATE,
      permissionResource: ResType.ORGANIZATION,
      permissionScope: ScopeType.GLOBAL,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.organization,
    component: OrganizationComponent,
    data: {
      permissionType: OpsType.VIEW,
    },
    canActivate: [OrgAccessGuard],
  },
  {
    path: routeConfig.organizationEdit,
    component: OrganizationEditComponent,
    data: {
      permissionType: OpsType.EDIT,
    },
    canActivate: [OrgAccessGuard],
  },
  {
    path: routeConfig.users,
    component: UserTableComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.USER,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.usersForOrganization,
    component: UserTableComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.USER,
    },
    canActivate: [AccessGuardByOrgId],
  },
  {
    path: routeConfig.userCreate,
    component: UserEditComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.CREATE,
      permissionResource: ResType.USER,
      permissionScope: ScopeType.GLOBAL,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.userCreateForOrganization,
    component: UserEditComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.CREATE,
      permissionResource: ResType.USER,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.user,
    component: UserViewSingleComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.USER,
    },
    canActivate: [AccessGuardByOrgId],
  },
  {
    // TODO think what happens if a user tries to go to edit a user that they're
    // not allowed to edit, by directly going to the path? Does it work? Otherwise,
    // change the accessguard
    path: routeConfig.userEdit,
    component: UserEditComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.EDIT,
      permissionResource: ResType.USER,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.roles,
    component: RoleTableComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.ROLE,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.rolesForOrganization,
    component: RoleTableComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.ROLE,
    },
    canActivate: [AccessGuardByOrgId],
  },
  {
    path: routeConfig.roleCreate,
    component: RoleEditComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.CREATE,
      permissionResource: ResType.ROLE,
      permissionScope: ScopeType.GLOBAL,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.roleCreateForOrganization,
    component: RoleEditComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.CREATE,
      permissionResource: ResType.ROLE,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.role,
    component: RoleViewSingleComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.ROLE,
    },
    canActivate: [AccessGuardByOrgId],
  },
  {
    path: routeConfig.roleEdit,
    component: RoleEditComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.EDIT,
      permissionResource: ResType.ROLE,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.collaborations,
    component: CollaborationTableComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.COLLABORATION,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.collaborationsForOrganization,
    component: CollaborationTableComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.COLLABORATION,
    },
    canActivate: [AccessGuardByOrgId],
  },
  {
    path: routeConfig.collaboration,
    component: CollaborationViewSingleComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.COLLABORATION,
    },
    canActivate: [AccessGuardByOrgId],
  },
  {
    path: routeConfig.collaborationCreate,
    component: CollaborationEditComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.CREATE,
      permissionResource: ResType.COLLABORATION,
      permissionScope: ScopeType.GLOBAL,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.collaborationEdit,
    component: CollaborationEditComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.EDIT,
      permissionResource: ResType.COLLABORATION,
      permissionScope: ScopeType.GLOBAL,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.tasks,
    component: TaskTableComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.TASK,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.taskPerOrganization,
    component: TaskTableComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.TASK,
    },
    canActivate: [AccessGuardByOrgId],
  },
  {
    path: routeConfig.tasksPerCollaboration,
    component: TaskTableComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.TASK,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.task,
    component: TaskViewSingleComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.TASK,
    },
    canActivate: [AccessGuardByOrgId],
  },
  {
    path: routeConfig.taskCreate,
    component: TaskCreateComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.CREATE,
      permissionResource: ResType.TASK,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.taskRepeat,
    component: TaskCreateComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.CREATE,
      permissionResource: ResType.TASK,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.nodes,
    component: NodeTableComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.NODE,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.nodesPerOrganization,
    component: NodeTableComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.NODE,
    },
    canActivate: [AccessGuardByOrgId],
  },
  {
    path: routeConfig.nodesPerCollaboration,
    component: NodeTableComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.NODE,
      permissionScope: ScopeType.GLOBAL,
    },
    canActivate: [AccessGuard],
  },
  {
    path: routeConfig.node,
    component: NodeSingleViewComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.VIEW,
      permissionResource: ResType.NODE,
    },
    canActivate: [AccessGuardByOrgId],
  },
  {
    path: 'status-messages',
    component: SocketMessagesComponent,
    data: {
      requiresLogin: true,
      permissionType: OpsType.RECEIVE,
      permissionResource: ResType.EVENT,
    },
  },
];
//TODO add * path with 404 not found page

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
