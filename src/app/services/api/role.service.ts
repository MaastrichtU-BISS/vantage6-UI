import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EMPTY_ROLE, Role } from 'src/app/interfaces/role';
import { Rule } from 'src/app/interfaces/rule';

import { environment } from 'src/environments/environment';
import { getIdsFromArray } from 'src/app/utils';
import { ConvertJsonService } from '../convert-json.service';
import { UserPermissionService } from '../user-permission.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  all_rules: Rule[] = [];
  constructor(
    private http: HttpClient,
    private convertJsonService: ConvertJsonService,
    private userPermission: UserPermissionService
  ) {
    this.userPermission.getRuleDescriptions().subscribe((rules) => {
      this.all_rules = rules;
    });
  }

  list(organization_id: number | null = null, include_root: boolean = false) {
    let params: any = {};
    if (organization_id !== null) {
      params['organization_id'] = organization_id;
    }
    params['include_root'] = include_root;
    return this.http.get(environment.api_url + '/role', { params: params });
  }

  get(id: number) {
    return this.http.get<any>(environment.api_url + '/role/' + id);
  }

  update(role: Role) {
    const data = this._get_data(role);
    return this.http.patch<any>(environment.api_url + '/role/' + role.id, data);
  }

  create(role: Role) {
    const data = this._get_data(role);
    return this.http.post<any>(environment.api_url + '/role', data);
  }

  delete(role: Role) {
    return this.http.delete<any>(environment.api_url + '/role/' + role.id);
  }

  private _get_data(role: Role): any {
    return {
      name: role.name,
      description: role.description,
      organization_id: role.organization_id,
      rules: getIdsFromArray(role.rules),
    };
  }

  getRole(id: number): Role {
    this.get(id).subscribe(
      (data: any) => {
        console.log(data);
        let role = this.convertJsonService.getRole(data, this.all_rules);
        console.log(role);
        console.log(this.all_rules);
        return role;
      },
      (error) => {
        console.log(error);
      }
    );
    return EMPTY_ROLE;
  }

  getRoles(ids: number[]): Role[] {
    let roles: Role[] = [];
    for (let id of ids) {
      roles.push(this.getRole(id));
    }
    return roles;
  }
}
