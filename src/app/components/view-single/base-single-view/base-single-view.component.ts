import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPermissionService } from 'src/app/auth/services/user-permission.service';
import { ModalService } from 'src/app/services/common/modal.service';
import { UtilsService } from 'src/app/services/common/utils.service';
import { ResType } from 'src/app/shared/enum';

@Component({
  selector: 'app-base-single-view',
  templateUrl: './base-single-view.component.html',
  styleUrls: ['./base-single-view.component.scss'],
})
export abstract class BaseSingleViewComponent implements OnInit {
  route_id: number | null = null;
  resource_type: ResType;

  constructor(
    protected activatedRoute: ActivatedRoute,
    public userPermission: UserPermissionService,
    protected utilsService: UtilsService,
    resource_type: ResType,
    protected modalService: ModalService
  ) {
    this.resource_type = resource_type;
  }

  ngOnInit(): void {
    this.modalService.openLoadingModal();
    this.userPermission.isInitialized().subscribe((ready: boolean) => {
      if (ready) {
        this.init();
      }
    });
  }

  async init() {
    this.readRoute();
  }

  abstract setResources(): Promise<void>;

  protected readRoute(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.route_id = this.utilsService.getId(params, this.resource_type);
      if (this.route_id === -1) {
        return; // cannot get route id
      }
      this.setup();
    });
  }

  protected async setup() {
    await this.setResources();
    this.modalService.closeLoadingModal();
  }

  public goBackToPreviousPage() {
    this.utilsService.goToPreviousPage();
  }
}
