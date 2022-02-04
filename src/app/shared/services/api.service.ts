import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Resource } from '../enum';

import { Collaboration } from 'src/app/collaboration/interfaces/collaboration';
import { User } from 'src/app/user/interfaces/user';
import { Role } from 'src/app/role/interfaces/role';
import { Rule } from 'src/app/rule/interfaces/rule';
import { Organization } from 'src/app/organization/interfaces/organization';
import { ModalService } from 'src/app/modal/modal.service';
import { ModalMessageComponent } from 'src/app/modal/modal-message/modal-message.component';

type ResourceType = User | Role | Rule | Organization | Collaboration;

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService {
  resource: Resource;
  protected resource_list: ResourceType[] = [];

  constructor(
    resource: Resource,
    protected http: HttpClient,
    protected modalService: ModalService
  ) {
    this.resource = resource;
  }

  protected list(): any {
    return this.http.get(environment.api_url + '/' + this.resource);
  }

  protected get(id: number): any {
    return this.http.get(environment.api_url + '/' + this.resource + '/' + id);
  }

  update(resource: ResourceType) {
    const data = this.get_data(resource);
    return this.http.patch<any>(
      environment.api_url + '/' + resource.type + '/' + resource.id,
      data
    );
  }

  create(resource: ResourceType) {
    const data = this.get_data(resource);
    return this.http.post<any>(environment.api_url + '/' + resource.type, data);
  }

  delete(resource: ResourceType) {
    return this.http.delete<any>(
      environment.api_url + '/' + resource.type + '/' + resource.id
    );
  }

  abstract get_data(resource: any): any;

  async getResource(
    id: number,
    convertJsonFunc: Function,
    additionalConvertArgs: ResourceType[][] = []
  ): Promise<any> {
    let json: any;
    try {
      json = await this.get(id).toPromise();
      return convertJsonFunc(json, ...additionalConvertArgs);
    } catch (error: any) {
      this.modalService.openMessageModal(ModalMessageComponent, [
        'Error: ' + error.error.msg,
      ]);
      return null;
    }
  }

  async getResources(
    force_refresh: boolean,
    convertJsonFunc: Function,
    additionalConvertArgs: ResourceType[][] = []
  ): Promise<any> {
    if (!force_refresh && this.resource_list.length > 0) {
      return this.resource_list;
    }
    // get data of nodes that logged-in user is allowed to view
    let json_data = await this.list().toPromise();

    // set nodes
    this.resource_list = [];
    for (let dic of json_data) {
      this.resource_list.push(convertJsonFunc(dic, ...additionalConvertArgs));
    }
    return this.resource_list;
  }
}