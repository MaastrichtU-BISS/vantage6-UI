import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserPermissionService } from 'src/app/auth/services/user-permission.service';
import { Collaboration } from 'src/app/interfaces/collaboration';
import { Organization } from 'src/app/interfaces/organization';
import { Node } from 'src/app/interfaces/node';
import {
  Task,
  getEmptyTask,
  TaskInput,
  getEmptyTaskInput,
} from 'src/app/interfaces/task';
import { TaskApiService } from 'src/app/services/api/task-api.service';
import { ModalService } from 'src/app/services/common/modal.service';
import { UtilsService } from 'src/app/services/common/utils.service';
import { CollabDataService } from 'src/app/services/data/collab-data.service';
import { OrgDataService } from 'src/app/services/data/org-data.service';
import { RunDataService } from 'src/app/services/data/run-data.service';
import { TaskDataService } from 'src/app/services/data/task-data.service';
import {
  addOrReplace,
  deepcopy,
  filterArrayByProperty,
  getById,
  getIdsFromArray,
  removeMatchedIdFromArray,
  removeValueFromArray,
} from 'src/app/shared/utils';
import { BaseEditComponent } from '../base-edit/base-edit.component';
import { ExitMode, OpsType, ResType, ScopeType } from 'src/app/shared/enum';
import { allPages } from 'src/app/interfaces/utils';
import { Run } from 'src/app/interfaces/run';
import { routePaths } from 'src/app/routes';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: [
    '../../../shared/scss/buttons.scss',
    './task-create.component.scss',
  ],
})
export class TaskCreateComponent extends BaseEditComponent implements OnInit {
  task: Task = getEmptyTask();
  repeatable_tasks: Task[] = [];
  has_selected_previous_task: boolean = false;
  task_input: TaskInput = getEmptyTaskInput();
  collaborations: Collaboration[] = [];
  organizations: Organization[] = [];
  nodes: Node[] = [];
  selected_orgs: Organization[] = [];
  deselected_orgs: Organization[] = [];
  warning_message_master: string = '';
  warning_message_encryption: string = '';
  logged_in_org_id: number = -1;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    public userPermission: UserPermissionService,
    protected taskApiService: TaskApiService,
    protected taskDataService: TaskDataService,
    protected modalService: ModalService,
    protected utilsService: UtilsService,
    private collabDataService: CollabDataService,
    private orgDataService: OrgDataService,
    private runDataService: RunDataService
  ) {
    super(
      router,
      activatedRoute,
      userPermission,
      utilsService,
      taskApiService,
      taskDataService,
      modalService
    );
  }

  ngOnInit(): void {
    this.userPermission.isInitialized().subscribe((ready) => {
      if (ready) {
        super.ngOnInit();
        this.logged_in_org_id = this.userPermission.user.organization_id;
      }
    });
  }

  async init(): Promise<void> {
    // TODO get only organizations that are part of collaborations with the logged-in user?
    (await this.orgDataService.list(false, allPages())).subscribe((orgs) => {
      this.organizations = orgs;
    });
    (await this.collabDataService.list_with_params(
      allPages(), { organization_id: this.logged_in_org_id}
    )).subscribe((collabs) => {
      this.collaborations = collabs;
    });

    // subscribe to id parameter in route to change edited role if required
    this.readRoute();

    // set defaults
    // this.task.data_format = 'legacy';
    this.task.databases = [''];
    this.initializeTaskInput();

    // set previous tasks, so user can create tasks they have done before.
    // Only include task for the logged-in user, and no subtasks
    // TODO create a function to get all tasks for a user, and without the
    // subtasks, and use that here
    (await this.taskDataService.list(false, allPages())).subscribe((tasks) => {
      tasks = filterArrayByProperty(
        tasks,
        'init_user_id',
        this.userPermission.user.id
      );
      tasks = filterArrayByProperty(tasks, 'parent_id', null);
      this.repeatable_tasks = tasks;
    });
  }

  async setup(params: ParamMap) {
    if (this.router.url.includes('repeat')) {
      let id = Number(params.get('id'));
      (await this.taskDataService.get(id)).subscribe((task) => {
        this.selectPreviousTask(task);
      });
    }
    super.setup(params);
  }

  initializeTaskInput() {
    this.task_input = getEmptyTaskInput();
    this.task_input.args = [''];
    this.task_input.kwargs = [{ key: '', value: '' }];
    // TODO UI task now always have JSON output format. Should we create option
    // to change this?
    this.task_input.output_format = 'json';
  }

  async setupCreate() {}

  async setupEdit(id: number): Promise<void> {
    // edit tasks is not possible: this is a dummy implementation of super func
  }

  public getNameCollabDropdown(): string {
    return this.task.collaboration === undefined
      ? 'Select collaboration'
      : this.task.collaboration.name;
  }

  public getNamePrevTaskDropdown(): string {
    return this.has_selected_previous_task
      ? `${this.task.id} - ${this.task.name}`
      : 'Select task';
  }

  public async selectCollab(collab: Collaboration): Promise<void> {
    this.task.collaboration = collab;
    // get organizations for this collaboration
    (await this.orgDataService.list_with_params(
      allPages(), { collaboration_id: this.task.collaboration.id }
    )).subscribe((orgs) => {
      (this.task.collaboration as Collaboration).organizations = orgs;
    });

    this.selected_orgs = [];
    this.deselected_orgs = collab.organizations;
    this.checkMasterMultiOrg();
    if (this.task.collaboration.encrypted) {
      this.warning_message_encryption =
        'This collaboration is encrypted. Unfortunately, the UI does not ' +
        'support creating encrypted tasks at present.';
    }
  }

  async selectPreviousTask(task: Task): Promise<void> {
    this.has_selected_previous_task = true;
    this.task = task;
    this.selectCollab(getById(this.collaborations, task.collaboration_id));
    this.task.databases.push(''); // add empty database so user  can add one
    if (this.task.collaboration){
      // TODO this call should not be necessary, as it is done in selectCollab()
      // but somehow it is. Check if task is renewed somewhere else.
      (await this.orgDataService.list_with_params(
        allPages(), { collaboration_id: this.task.collaboration.id }
      )).subscribe((orgs) => {
        (this.task.collaboration as Collaboration).organizations = orgs;
      });
    }

    // Get also the task's algorithm runs as this includes the input and the
    // organization
    (await this.runDataService.get_by_task_id(this.task.id)).subscribe(
      (runs) => {
        if (runs.length > 0) this.addPreviousTaskFields(runs);
      }
    );
  }

  addPreviousTaskFields(runs: Run[]) {
    // set organizations
    for (let r of runs) {
      this.addOrg(getById(this.organizations, r.organization_id));
    }
    // set input
    let first_run = runs[0];
    let input = JSON.parse(atob(first_run.input));
    this.task_input.master = input.master;
    this.task_input.method = input.method;
    if (input.args) {
      this.task_input.args = input.args;
      this.task_input.args.push('');
    }
    if (input.kwargs) {
      this.task_input.kwargs = [];
      for (let key in input.kwargs) {
        this.task_input.kwargs.push({ key: key, value: input.kwargs[key] });
      }
      // create empty kwarg if user wants to add more
      this.task_input.kwargs.push({ key: '', value: '' });
    }
  }

  public addOrg(org: Organization): void {
    this.selected_orgs = addOrReplace(this.selected_orgs, org);
    this.deselected_orgs = removeMatchedIdFromArray(
      this.deselected_orgs,
      org.id
    );
    this.checkMasterMultiOrg();
  }

  public removeOrg(org: Organization) {
    this.deselected_orgs.push(org);
    this.selected_orgs = removeMatchedIdFromArray(this.selected_orgs, org.id);
    this.checkMasterMultiOrg();
  }

  canBeCreated(): boolean {
    return (
      this.task.collaboration !== undefined &&
      this.selected_orgs.length !== 0 &&
      !this.task.collaboration.encrypted
    );
  }

  async check_and_create() {
    // set input, then remove empty args and kwargs
    this.task.input = deepcopy(this.task_input) as TaskInput;
    this.task.input.args = removeValueFromArray(this.task.input.args, '');
    this.task.input.kwargs = this.task.input.kwargs.filter(
      (elem) => elem.key !== '' || elem.value != ''
    );

    // check input validity
    if (this.task.input.kwargs.some((elem) => elem.key === '')) {
      this.modalService.openErrorModal(
        'Some kwargs have an undefined key. Cannot create task!'
      );
      return;
    } else if (this.task.collaboration === undefined) {
      this.modalService.openErrorModal(
        'You have not selected a collaboration to create the task for!'
      );
      return;
    } else if (this.selected_orgs.length === 0) {
      this.modalService.openErrorModal(
        'You have not selected which organizations should run this task!'
      );
      return;
    } else if (this.task.image === '') {
      this.modalService.openErrorModal(
        'You have not specified a Docker image for the algorithm!'
      );
      return;
    } else if (this.task.input.method === '') {
      this.modalService.openErrorModal(
        'You have not specified which method in the algorithm should be run!'
      );
      return;
    }

    // set selected organizations
    this.task.organizations = this.selected_orgs;

    // if user is not allowed to see other organizations and/or nodes, we start
    // the task without checking if other nodes are online - that is impossible
    if (
      !this.userPermission.hasMininimalPermission(
        OpsType.VIEW,
        ResType.ORGANIZATION,
        ScopeType.COLLABORATION
      ) ||
      !this.userPermission.hasPermission(
        OpsType.VIEW,
        ResType.NODE,
        ScopeType.GLOBAL
      )
    ) {
      this.createTask();
      this.modalService.openMessageModal([
        'The task has been created!',
        'Note that you do not have permissions to view if all required ' +
          'nodes are online. If they are not, the task will not complete.',
      ]);
      return;
    }

    // check which nodes should be online to complete the task
    let org_ids_to_be_online = [];
    if (this.task_input.master) {
      // master method: all nodes should be online
      org_ids_to_be_online = getIdsFromArray(
        (this.task.collaboration as Collaboration).organizations
      );
    } else {
      // non-master method: only selected nodes need to be online
      org_ids_to_be_online = getIdsFromArray(this.selected_orgs);
    }

    // check if nodes are online.
    let offline_nodes: Node[] = [];
    for (let org of (this.task.collaboration as Collaboration).organizations) {
      if (
        org_ids_to_be_online.includes(org.id) &&
        org.node &&
        !org.node.is_online
      ) {
        offline_nodes.push(org.node);
      }
    }

    if (offline_nodes.length === 0) {
      // all relevant nodes are online!
      this.createTask();
    } else {
      this.alertNodesOffline(offline_nodes);
    }
  }

  async createTask() {
    this.task.created_via_ui = true;
    // create task
    await this.save(this.task, false);

    // go to the page for the task we just created
    this.router.navigate([routePaths.task, this.logged_in_org_id, this.task.id]);
  }

  alertNodesOffline(offline_nodes: Node[]): void {
    this.modalService
      .openTaskCreateModal(
        [
          'The nodes below that will be involved in handling this task are ' +
            'not online. The task you are about to create will therefore ' +
            'not be executed smoothly.',
        ],
        offline_nodes
      )
      .result.then((data) => {
        if (data.exitMode === ExitMode.CREATE) {
          this.createTask();
        }
      });
  }

  trackArgsFunc(index: any, item: any) {
    // function to track input index
    // see https://forum.ionicframework.com/t/how-to-put-ngfor-value-in-input-element/133127/5
    return index;
  }

  checkAddBox(array: any[]): void {
    // add new input box for args if last box is filled
    if (array[array.length - 1] != '') {
      array.push('');
    }
  }

  checkAddKwargsBox(): void {
    let last_kwarg = this.task_input.kwargs[this.task_input.kwargs.length - 1];
    if (last_kwarg.key !== '' || last_kwarg.value !== '') {
      this.task_input.kwargs.push({ key: '', value: '' });
    }
  }

  checkMasterMultiOrg(): void {
    if (this.task_input.master && this.selected_orgs.length > 1) {
      this.warning_message_master =
        'You have selected a master task for multiple organizations. ' +
        'Usually master tasks are run on one organzation and then ' +
        'it creates subtasks for others. Are you sure?';
    } else {
      this.warning_message_master = '';
    }
  }
}
