import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserPermissionService } from 'src/app/auth/services/user-permission.service';
import { Organization } from 'src/app/interfaces/organization';
import { BaseApiService } from 'src/app/services/api/base-api.service';
import { ModalService } from 'src/app/services/common/modal.service';
import { UtilsService } from 'src/app/services/common/utils.service';
import { BaseDataService } from 'src/app/services/data/base-data.service';
import { OpsType, ResType } from 'src/app/shared/enum';
import { Resource } from 'src/app/shared/types';
import { parseId } from 'src/app/shared/utils';

@Component({
  selector: 'app-base-edit',
  templateUrl: './base-edit.component.html',
  styleUrls: ['./base-edit.component.scss'],
})
export abstract class BaseEditComponent implements OnInit {
  mode = OpsType.EDIT;

  organization_id: number | null = null;
  selected_org: Organization | null = null;
  route_id: number | null = null;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    public userPermission: UserPermissionService,
    protected utilsService: UtilsService,
    protected apiService: BaseApiService,
    protected dataService: BaseDataService,
    protected modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.modalService.openLoadingModal();
    if (this.router.url.includes(OpsType.CREATE)) {
      this.mode = OpsType.CREATE;
    }
    this.init();
  }

  abstract init(): void;

  abstract setupCreate(): void;
  abstract setupEdit(id: number): Promise<void>;

  protected readRoute() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.setup(params);
    });
  }

  protected async setup(params: ParamMap) {
    if (this.mode === OpsType.CREATE) {
      // TODO if creating an organization, no organization is available.
      // Everything goes well nevertheless, but it is a bit weird this code is
      // executed which sets some NaNs...
      this.route_id = parseId(params.get('org_id'));
      this.organization_id = this.route_id; // TODO should we do with a single variable? Get rid of route_id?
      await this.setupCreate();
    } else {
      let id = this.utilsService.getId(params, ResType.USER);
      await this.setupEdit(id);
    }
    this.modalService.closeLoadingModal();
  }

  public cancel(): void {
    this.utilsService.goToPreviousPage();
  }

  public isCreate(): boolean {
    return this.mode === OpsType.CREATE;
  }

  public isCreateAnyOrg(): boolean {
    return this.isCreate() && !this.route_id;
  }

  public selectOrg(org: Organization): void {
    this.selected_org = org;
    this.organization_id = org.id;
  }

  public getNameOrgDropdown(): string {
    return this.selected_org === null
      ? 'Select organization'
      : this.selected_org.name;
  }

  public async save(
    resource: Resource,
    goToPreviousPage: boolean = true
  ): Promise<any> {
    let request;
    if (this.mode === OpsType.CREATE) {
      request = this.apiService.create(resource);
    } else {
      request = this.apiService.update(resource);
    }

    return request
      .toPromise()
      .then((data) => {
        // save the ID that newly created data had
        if (this.mode === OpsType.CREATE) {
          resource.id = data.id;
          this.dataService.save(resource);
        }
        if (goToPreviousPage) {
          this.utilsService.goToPreviousPage();
        }
        return data;
      })
      .catch((error) => {
        let msg = error.error.msg;
        if (error.error.errors) {
            // append errors of request validation to error message (if any)
            let errors = error.error.errors;
            msg = msg + ' (' + Object.keys(errors).map(
                key=>`${key}: ${errors[key]}`
            ).join(', ') + ')';
        }
        this.modalService.openErrorModal(msg);
        return null;
      });
  }
}
