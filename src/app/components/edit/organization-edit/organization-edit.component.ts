import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  getEmptyOrganization,
  Organization,
} from 'src/app/interfaces/organization';

import { OrganizationApiService } from 'src/app/services/api/organization-api.service';
import { ModalService } from 'src/app/services/common/modal.service';
import { OpsType } from 'src/app/shared/enum';
import { UtilsService } from 'src/app/services/common/utils.service';
import { OrgDataService } from 'src/app/services/data/org-data.service';
import { BaseEditComponent } from 'src/app/components/edit/base-edit/base-edit.component';
import { UserPermissionService } from 'src/app/auth/services/user-permission.service';
import { FileService } from 'src/app/services/common/file.service';
import { routePaths } from 'src/app/routes';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: [
    '../../../shared/scss/buttons.scss',
    './organization-edit.component.scss',
  ],
})
export class OrganizationEditComponent
  extends BaseEditComponent
  implements OnInit
{
  organization: Organization = getEmptyOrganization();
  public_key_file: File | null = null;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected orgApiService: OrganizationApiService,
    protected orgDataService: OrgDataService,
    protected modalService: ModalService,
    protected utilsService: UtilsService,
    public userPermission: UserPermissionService,
    private fileService: FileService
  ) {
    super(
      router,
      activatedRoute,
      userPermission,
      utilsService,
      orgApiService,
      orgDataService,
      modalService
    );
  }

  async init(): Promise<void> {
    this.readRoute();
  }

  async setupEdit(id: number) {
    (await this.orgDataService.get(id)).subscribe((org) => {
      if (org) {
        this.organization = org;
      }
    });
  }

  setupCreate(): void {
    // nothing has to be done here for organizations - just implementing
    // abstract base function
  }

  async save(): Promise<void> {
    const new_public_key = await this.readUploadedFile();

    let old_public_key = this.organization.public_key;
    if (new_public_key) {
      this.organization.public_key = new_public_key;
    }
    let org_json = await super.save(this.organization, false);

    // reset public key if saving organization failed
    if (org_json === null) {
      this.organization.public_key = old_public_key;
    } else {
      this.router.navigate([routePaths.organization[0], org_json.id]);
    }
  }

  uploadPublicKey($event: any): void {
    this.public_key_file = this.fileService.uploadFile($event);
  }

  uploadPublicKeyText(): string {
    return this.organization.public_key
      ? 'Upload new public key:'
      : 'Upload public key:';
  }

  async readUploadedFile(): Promise<string | undefined> {
    if (this.public_key_file) {
      return await this.fileService.readFile(this.public_key_file as File);
    } else {
      return undefined;
    }
  }

  getTitle(): string {
    return this.mode === OpsType.EDIT
      ? `Edit organization '${this.organization.name}'`
      : 'Create organization';
  }
}
