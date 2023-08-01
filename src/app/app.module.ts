import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {
  AccessGuard,
  AccessGuardByOrgId,
  OrgAccessGuard,
} from './auth/access-guard.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PermissionTableComponent } from './components/permission-table/permission-table.component';
import { UserEditComponent } from './components/edit/user-edit/user-edit.component';
import { UserViewComponent } from './components/view/user-view/user-view.component';
import { RoleViewComponent } from './components/view/role-view/role-view.component';
import { RoleEditComponent } from './components/edit/role-edit/role-edit.component';
import { ModalDeleteComponent } from './components/modal/modal-delete/modal-delete.component';
import { ModalMessageComponent } from './components/modal/modal-message/modal-message.component';
import { OrganizationEditComponent } from './components/edit/organization-edit/organization-edit.component';
import { CollaborationViewComponent } from './components/view/collaboration-view/collaboration-view.component';
import { NodeViewComponent } from './components/view/node-view/node-view.component';
import { ModalEditComponent } from './components/modal/modal-edit/modal-edit.component';
import { CollaborationEditComponent } from './components/edit/collaboration-edit/collaboration-edit.component';
import { RoleTableComponent } from './components/table/role-table/role-table.component';
import { CdkDetailRowDirective } from './components/table/base-table/cdk-detail-row-directive';
import { UserTableComponent } from './components/table/user-table/user-table.component';
import { NodeTableComponent } from './components/table/node-table/node-table.component';
import { CollaborationViewSingleComponent } from './components/view-single/collaboration-view-single/collaboration-view-single.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskTableComponent } from './components/table/task-table/task-table.component';
import { TaskViewComponent } from './components/view/task-view/task-view.component';
import { TaskViewSingleComponent } from './components/view-single/task-view-single/task-view-single.component';
import { RunViewComponent } from './components/view/run-view/run-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CollaborationTableComponent } from './components/table/collaboration-table/collaboration-table.component';
import { RoleViewSingleComponent } from './components/view-single/role-view-single/role-view-single.component';
import { UserViewSingleComponent } from './components/view-single/user-view-single/user-view-single.component';
import { NodeSingleViewComponent } from './components/view-single/node-single-view/node-single-view.component';
import { ModalLoadingComponent } from './components/modal/modal-loading/modal-loading.component';
import { PasswordLostComponent } from './components/login/password-lost/password-lost.component';
import { PasswordRecoverComponent } from './components/login/password-recover/password-recover.component';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { ChangePasswordComponent } from './components/edit/user-edit/change-password/change-password.component';
import { SocketioConnectService } from './services/common/socketio-connect.service';
import { ModalKillComponent } from './components/modal/modal-kill/modal-kill.component';
import { SocketMessagesComponent } from './components/table/socket-messages/socket-messages.component';
import { SetupMfaComponent } from './components/login/setup-mfa/setup-mfa.component';
import { MfaCodeComponent } from './components/login/mfa-code/mfa-code.component';
import { MfaLostComponent } from './components/login/mfa-lost/mfa-lost.component';
import { MfaRecoverComponent } from './components/login/mfa-recover/mfa-recover.component';
import { TaskCreateComponent } from './components/edit/task-create/task-create.component';
import { ModalCreateComponent } from './components/modal/modal-create/modal-create.component';
import { HomeTilesComponent } from './components/home-tiles/home-tiles.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    OrganizationComponent,
    PermissionTableComponent,
    UserEditComponent,
    UserViewComponent,
    RoleViewComponent,
    RoleEditComponent,
    ModalDeleteComponent,
    ModalMessageComponent,
    OrganizationEditComponent,
    CollaborationViewComponent,
    NodeViewComponent,
    ModalEditComponent,
    CollaborationEditComponent,
    RoleTableComponent,
    CdkDetailRowDirective,
    UserTableComponent,
    NodeTableComponent,
    CollaborationViewSingleComponent,
    TaskTableComponent,
    TaskViewComponent,
    TaskViewSingleComponent,
    RunViewComponent,
    ProfileComponent,
    CollaborationTableComponent,
    RoleViewSingleComponent,
    UserViewSingleComponent,
    NodeSingleViewComponent,
    ModalLoadingComponent,
    PasswordLostComponent,
    PasswordRecoverComponent,
    LoginPageComponent,
    ChangePasswordComponent,
    ModalKillComponent,
    SocketMessagesComponent,
    SetupMfaComponent,
    MfaCodeComponent,
    MfaLostComponent,
    MfaRecoverComponent,
    TaskCreateComponent,
    ModalCreateComponent,
    HomeTilesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatExpansionModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatListModule,
    CommonModule,
    NgbModule,
    QRCodeModule,
  ],
  providers: [
    AccessGuard,
    OrgAccessGuard,
    AccessGuardByOrgId,
    SocketioConnectService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
