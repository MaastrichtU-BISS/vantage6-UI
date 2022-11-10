import { Injectable } from '@angular/core';
import { ConvertJsonService } from '../common/convert-json.service';
import { BaseDataService } from './base-data.service';
import { Task } from 'src/app/interfaces/task';
import { Observable } from 'rxjs';
import { TaskApiService } from '../api/task-api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskDataService extends BaseDataService {
  constructor(
    protected apiService: TaskApiService,
    protected convertJsonService: ConvertJsonService
  ) {
    super(apiService, convertJsonService);
  }

  async get(
    id: number,
    force_refresh: boolean = false
  ): Promise<Observable<Task>> {
    return (await super.get_base(
      id,
      this.convertJsonService.getTask,
      force_refresh
    )) as Observable<Task>;
  }

  async list(force_refresh: boolean = false): Promise<Observable<Task[]>> {
    return (await super.list_base(
      this.convertJsonService.getTask,
      force_refresh
    )) as Observable<Task[]>;
  }

  async org_list(
    organization_id: number,
    force_refresh: boolean = false
  ): Promise<Observable<Task[]>> {
    return (await super.org_list_base(
      organization_id,
      this.convertJsonService.getTask,
      force_refresh
    )) as Observable<Task[]>;
  }

  async collab_list(
    collaboration_id: number,
    force_refresh: boolean = false
  ): Promise<Observable<Task[]>> {
    return (await super.collab_list_base(
      collaboration_id,
      this.convertJsonService.getTask,
      force_refresh
    )) as Observable<Task[]>;
  }

  save(task: Task) {
    // remove organization and collaboration properties - these should be set
    // within components where needed to prevent endless loop of updates
    if (task.initiator) task.initiator = undefined;
    if (task.collaboration) task.collaboration = undefined;
    super.save(task);
  }
}
