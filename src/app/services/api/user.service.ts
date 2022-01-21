import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { EMPTY_USER, User } from 'src/app/interfaces/user';
import { getIdsFromArray } from 'src/app/utils';
import { RoleService } from './role.service';
import { Rule } from 'src/app/interfaces/rule';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private roleService: RoleService) {}

  list(organization_id: number | null = null) {
    let params: any = {};
    if (organization_id !== null) {
      params['organization_id'] = organization_id;
    }
    return this.http.get(environment.api_url + '/user', { params: params });
  }

  get(id: number) {
    return this.http.get<any>(environment.api_url + '/user/' + id);
  }

  update(user: User) {
    let data = this._get_data(user);
    return this.http.patch<any>(environment.api_url + '/user/' + user.id, data);
  }

  create(user: User) {
    const data = this._get_data(user);
    return this.http.post<any>(environment.api_url + '/user', data);
  }

  delete(user: User) {
    return this.http.delete<any>(environment.api_url + '/user/' + user.id);
  }

  private _get_data(user: User): any {
    let data: any = {
      username: user.username,
      email: user.email,
      firstname: user.first_name,
      lastname: user.last_name,
      organization_id: user.organization_id,
      roles: getIdsFromArray(user.roles),
      rules: getIdsFromArray(user.rules),
    };
    if (user.password) {
      data.password = user.password;
    }
    return data;
  }

  getUser(id: number): User {
    if (id <= 0) return EMPTY_USER;

    // first obtain user information to get roles, then set user
    this.get(id).subscribe(
      (data: any) => {
        console.log(data);
        let role_ids = getIdsFromArray(data.roles);
        let roles = this.roleService.getRoles(role_ids);
        console.log(roles);
      },
      (error) => {
        console.log(error);
      }
    );

    // TODO set user by obtaining them from API
    return EMPTY_USER;
  }
}
