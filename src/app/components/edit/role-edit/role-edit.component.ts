import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { getEmptyRole, Role } from 'src/app/interfaces/role';
import { Rule } from 'src/app/interfaces/rule';
import { OpsType } from 'src/app/shared/enum';

import { RoleApiService } from 'src/app/services/api/role-api.service';
import { UserPermissionService } from 'src/app/auth/services/user-permission.service';
import { ModalService } from 'src/app/services/common/modal.service';
import { UtilsService } from 'src/app/services/common/utils.service';
import { RoleDataService } from 'src/app/services/data/role-data.service';
import { BaseEditComponent } from '../base-edit/base-edit.component';
import { OrgDataService } from 'src/app/services/data/org-data.service';
import { Organization } from 'src/app/interfaces/organization';
import { allPages } from 'src/app/interfaces/utils';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: [
    '../../../shared/scss/buttons.scss',
    './role-edit.component.scss',
  ],
})
export class RoleEditComponent extends BaseEditComponent implements OnInit {
  mode: OpsType = OpsType.EDIT;
  role: Role = getEmptyRole();
  role_orig_name: string = '';
  organizations: Organization[] = [];

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    public userPermission: UserPermissionService,
    protected RoleApiService: RoleApiService,
    protected roleDataService: RoleDataService,
    protected modalService: ModalService,
    protected utilsService: UtilsService,
    private orgDataService: OrgDataService
  ) {
    super(
      router,
      activatedRoute,
      userPermission,
      utilsService,
      RoleApiService,
      roleDataService,
      modalService
    );
  }

  async init(): Promise<void> {
    // subscribe to id parameter in route to change edited role if required
    this.readRoute();
  }

  async setupCreate() {
    if (!this.organization_id) {
      (await this.orgDataService.list(false, allPages())).subscribe(
        (orgs: Organization[]) => {
          this.organizations = orgs;
        }
      );
    }
  }

  async setupEdit(id: number): Promise<void> {
    (await this.roleDataService.get(id, true)).subscribe((role) => {
      if (role) {
        this.role = role;
        this.role_orig_name = this.role.name;
      }
    });
  }

  async save(): Promise<void> {
    if (this.role.rules.length === 0) {
      this.modalService.openMessageModal([
        'You have not selected any permissions! Please select at least one permission.',
      ]);
      return;
    }
    if (this.organization_id) this.role.organization_id = this.organization_id;

    super.save(this.role);
  }

  updateAddedRules($event: Rule[]) {
    this.role.rules = $event;
  }

  getTitle(): string {
    return this.mode === OpsType.EDIT
      ? `Edit role '${this.role_orig_name}'`
      : 'Create a new role';
  }
}
