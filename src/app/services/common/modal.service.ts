import { Injectable } from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateComponent } from 'src/app/components/modal/modal-create/modal-create.component';

import { ModalDeleteComponent } from 'src/app/components/modal/modal-delete/modal-delete.component';
import { ModalEditComponent } from 'src/app/components/modal/modal-edit/modal-edit.component';
import { ModalKillComponent } from 'src/app/components/modal/modal-kill/modal-kill.component';
import { ModalLoadingComponent } from 'src/app/components/modal/modal-loading/modal-loading.component';
import { ModalMessageComponent } from 'src/app/components/modal/modal-message/modal-message.component';
import { ResType } from 'src/app/shared/enum';
import { Resource } from 'src/app/shared/types';
import { Node } from 'src/app/interfaces/node';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  loadingModal: NgbModalRef | null = null;

  constructor(private modalService: NgbModal) {}

  openMessageModal(
    messages: string[] = [],
    go_back_after_close: boolean = false,
    keepOpen = false
  ): NgbModalRef {
    let options: NgbModalOptions = {};
    if (keepOpen) {
      options = {
        backdrop: 'static',
        keyboard: false,
      };
    }
    const modalRef = this.modalService.open(ModalMessageComponent, options);
    modalRef.componentInstance.messages = messages;
    modalRef.componentInstance.go_back_after_close = go_back_after_close;
    return modalRef;
  }

  openErrorModal(
    error_message: string | undefined,
    go_back_after_close: boolean = false,
    keepOpen = false
  ): NgbModalRef {
    if (!error_message) {
      error_message = 'Error: An unknown error occurred!';
    }
    return this.openMessageModal(
      [`Error: ${error_message}`],
      go_back_after_close,
      keepOpen
    );
  }

  openLoadingModal(keepOpen = true): void {
    let options: NgbModalOptions = {};
    if (keepOpen) {
      options = {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'loading-modal',
      };
    }
    this.loadingModal = this.modalService.open(ModalLoadingComponent, options);
  }

  closeLoadingModal(): void {
    if (this.loadingModal) {
      this.loadingModal?.close();
    }
  }

  openEditModal(param_name: string, current_value: string): NgbModalRef {
    const modalRef = this.modalService.open(ModalEditComponent, {});
    modalRef.componentInstance.param_name = param_name;
    modalRef.componentInstance.current_value = current_value;
    return modalRef;
  }

  openTaskCreateModal(messages: string[], offline_nodes: Node[]): NgbModalRef {
    const modalRef = this.modalService.open(ModalCreateComponent, {});
    modalRef.componentInstance.messages = messages;
    modalRef.componentInstance.offline_nodes = offline_nodes;
    return modalRef;
  }

  openDeleteModal(
    to_delete: Resource | Resource[],
    obj_type: ResType,
    extra_message: string | null = null
  ): NgbModalRef {
    const modalRef = this.modalService.open(ModalDeleteComponent, {});
    modalRef.componentInstance.to_delete = to_delete;
    modalRef.componentInstance.obj_type = obj_type;
    modalRef.componentInstance.extra_message = extra_message;
    return modalRef;
  }

  openKillModal(warning_message: string, id_info: string): NgbModalRef {
    const modalRef = this.modalService.open(ModalKillComponent, {});
    modalRef.componentInstance.warning_message = warning_message;
    modalRef.componentInstance.id_info = id_info;
    return modalRef;
  }
}
