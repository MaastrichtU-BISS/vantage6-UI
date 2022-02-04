import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EMPTY_ORGANIZATION, Organization } from '../interfaces/organization';
import { ModalService } from 'src/app/modal/modal.service';
import { ConvertJsonService } from 'src/app/shared/services/convert-json.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { Resource } from 'src/app/shared/enum';

@Injectable({
  providedIn: 'root',
})
export class ApiOrganizationService extends ApiService {
  organization_list: Organization[] = [];

  constructor(
    protected http: HttpClient,
    private convertJsonService: ConvertJsonService,
    protected modalService: ModalService
  ) {
    super(Resource.ORGANIZATION, http, modalService);
  }

  get_data(org: Organization): any {
    let data: any = {
      name: org.name,
      address1: org.address1,
      address2: org.address2,
      zipcode: org.zipcode,
      country: org.country,
      domain: org.domain,
      public_key: org.public_key,
    };
    return data;
  }

  async getOrganization(id: number): Promise<Organization> {
    let org = await super.getResource(
      id,
      this.convertJsonService.getOrganization
    );
    return org === null ? EMPTY_ORGANIZATION : org;
  }

  async getOrganizations(
    force_refresh: boolean = false
  ): Promise<Organization[]> {
    return await super.getResources(
      force_refresh,
      this.convertJsonService.getOrganization
    );
  }
}