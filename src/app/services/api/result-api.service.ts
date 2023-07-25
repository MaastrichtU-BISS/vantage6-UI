import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from 'src/app/interfaces/result';
import { ResType } from 'src/app/shared/enum';
import { environment } from 'src/environments/environment';
import { ConvertJsonService } from '../common/convert-json.service';
import { ModalService } from '../common/modal.service';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';

/**
 * Service for interacting with the result endpoints of the API
 */
@Injectable({
  providedIn: 'root',
})
export class ResultApiService extends BaseApiService {
  constructor(
    protected http: HttpClient,
    protected modalService: ModalService,
    private convertJsonService: ConvertJsonService
  ) {
    super(ResType.RESULT, http, modalService);
  }

  /**
   * Get a run by id from the API.
   *
   * @param id The id of the run to get.
   * @returns An observable for the request response.
   */
  get_by_task_id(task_id: number): Observable<any> {
    return this.http.get(environment.api_url + '/result', {
      params: { task_id: task_id },
    });
  }

  /**
   * Implement the abstract get_data function of the base class. This is not
   * useful for algorithm runs, since they should not be updated via this
   * user interface.
   */
  get_data(result: Result): any {
    // raise error if this function is called
    throw new Error('Algorithm results cannot be updated by the user.');
  }

  /**
   * Get the algorithm runs for the given task id.
   *
   * @param task_id The id of the task for which to get the algorithm runs.
   * @returns An array of algorithm runs.
   */
  async getResourcesByTaskId(task_id: number): Promise<Result[]> {
    // get data of resources that logged-in user is allowed to view
    let response: any = await this.get_by_task_id(task_id).toPromise();
    let json_data = response.data;

    let results: Result[] = [];
    for (let dic of json_data) {
      results.push(this.convertJsonService.getAlgorithmResult(dic));
    }
    return results;
  }
}