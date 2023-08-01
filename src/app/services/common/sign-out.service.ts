import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserPermissionService } from 'src/app/auth/services/user-permission.service';
import { TokenStorageService } from 'src/app/services/common/token-storage.service';
import { CollabDataService } from 'src/app/services/data/collab-data.service';
import { NodeDataService } from 'src/app/services/data/node-data.service';
import { OrgDataService } from 'src/app/services/data/org-data.service';
import { RoleDataService } from 'src/app/services/data/role-data.service';
import { RuleDataService } from 'src/app/services/data/rule-data.service';
import { UserDataService } from 'src/app/services/data/user-data.service';
import { SocketioConnectService } from './socketio-connect.service';
import { ModalService } from './modal.service';
import { routePaths } from 'src/app/routes';

@Injectable({
  providedIn: 'root',
})
export class SignOutService {
  constructor(
    private tokenStorage: TokenStorageService,
    public userPermission: UserPermissionService,
    private nodeDataService: NodeDataService,
    private orgDataService: OrgDataService,
    private collabDataService: CollabDataService,
    private roleDataService: RoleDataService,
    private userDataService: UserDataService,
    private ruleDataService: RuleDataService,
    private socketService: SocketioConnectService,
    private modalService: ModalService,
    private router: Router
  ) {}

  signOut(): void {
    this.tokenStorage.signOut();
    this.userPermission.clear();
    this.clearDataServices();
    this.router.navigate([routePaths.login]);
    this.modalService.closeLoadingModal();
    this.socketService.disconnect();
  }

  clearDataServices(): void {
    this.nodeDataService.clear();
    this.orgDataService.clear();
    this.collabDataService.clear();
    this.roleDataService.clear();
    this.ruleDataService.clear();
    this.userDataService.clear();
  }
}
