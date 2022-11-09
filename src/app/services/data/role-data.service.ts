import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Role } from 'src/app/interfaces/role';
import { Rule } from 'src/app/interfaces/rule';
import { RoleApiService } from 'src/app/services/api/role-api.service';
import { ConvertJsonService } from 'src/app/services/common/convert-json.service';
import { BaseDataService } from 'src/app/services/data/base-data.service';
import { Resource } from 'src/app/shared/types';
import { unique } from 'src/app/shared/utils';
import { RuleDataService } from './rule-data.service';

@Injectable({
  providedIn: 'root',
})
export class RoleDataService extends BaseDataService {
  rules: Rule[] = [];

  constructor(
    protected apiService: RoleApiService,
    protected convertJsonService: ConvertJsonService,
    private ruleDataService: RuleDataService
  ) {
    super(apiService, convertJsonService);
    this.getDependentResources();
  }

  async getDependentResources() {
    (await this.ruleDataService.list()).subscribe((rules) => {
      this.rules = rules;
      // TODO when rules change, update roles as well
    });
  }

  async get(
    id: number,
    force_refresh: boolean = false
  ): Promise<Observable<Role>> {
    await this.getDependentResources();
    return (await super.get_base(
      id,
      this.convertJsonService.getRole,
      [this.rules],
      force_refresh
    )) as Observable<Role>;
  }

  async list(force_refresh: boolean = false): Promise<Observable<Role[]>> {
    await this.getDependentResources();
    return (await super.list_base(
      this.convertJsonService.getRole,
      [this.rules],
      force_refresh
    )) as Observable<Role[]>;
  }

  async list_with_params(request_params: any = {}): Promise<Role[]> {
    await this.getDependentResources();
    return (await super.list_with_params_base(
      this.convertJsonService.getRole,
      [this.rules],
      request_params
    )) as Role[];
  }

  async org_list(
    organization_id: number,
    force_refresh: boolean = false
  ): Promise<Observable<Role[]>> {
    await this.getDependentResources();
    return (await super.org_list_base(
      organization_id,
      this.convertJsonService.getRole,
      [this.rules],
      force_refresh,
      { include_root: true }
    )) as Observable<Role[]>;
  }

  updateObsPerOrg(resources: Resource[]) {
    super.updateObsPerOrg(resources);

    // TODO add roles with org_id null to all organizations
    // default_roles = this.resources_per_org.get(null)
    // roles = this.remove_non_user_roles(roles);
  }

  private remove_non_user_roles(roles: Role[]) {
    // remove container and node roles as these are not relevant to the users
    for (let role_name of ['container', 'node']) {
      roles = roles.filter(function (role: any) {
        return role.name !== role_name;
      });
    }
    return roles;
  }

  isDefaultRole(role: Role): boolean {
    return role.organization_id === null;
  }
}
