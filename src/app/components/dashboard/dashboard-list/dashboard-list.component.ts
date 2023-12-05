import { Component, OnInit, Input } from '@angular/core';
import { Result, getEmptyResult } from 'src/app/interfaces/result';
import { ResultApiService } from 'src/app/services/api/result-api.service';
import { ResultDataService } from 'src/app/services/data/result-data.service';
import { ActivatedRoute } from '@angular/router';
import * as pickleparser from 'pickleparser';

type DashboardSchema = {
  type: string;
  title: string;
  data: any;
};

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
})
export class DashboardListComponent implements OnInit {

  result: Result = getEmptyResult();
  task_id: number = 0;
  dashboard_schema: DashboardSchema[] | null = null;
  loaded: boolean = false;
  active: string = '';

  constructor(
    protected resultApiService: ResultApiService,
    protected resultDataService: ResultDataService,
    protected route: ActivatedRoute
  ) {
    route.queryParamMap.subscribe(params => {
      this.task_id = +params.get('id')!;
   })
  }

  async setResults(): Promise<void> {
    (await this.resultDataService.get_by_task_id(this.task_id, true)).subscribe(
      (results) => {
        if (results.length > 0 && this.task_id !== results[0].task_id) return;
        this.result = results[0];
        this.loadData();
      }
    );
  }

  parseResults(): any {
    let json = null;
    if (this.result) {
      if (this.result.decrypted_result) {
        json = JSON.parse(this.result.decrypted_result as string);
      } else {
        const pickle = this.result.result;
        const buffer = Uint8Array.from(atob(pickle), (c) => c.charCodeAt(0));
        const parser = new pickleparser.Parser();
        const str = parser.parse(buffer);
        json = JSON.parse(str as string);
      }
    }
    return json;
  }

  loadData(): void {
    const json = this.parseResults().dashboard;
    this.dashboard_schema = json as DashboardSchema[];
    this.loaded = true;
    if (this.dashboard_schema && this.dashboard_schema.length) {
      this.active = this.dashboard_schema[0].title;
    }
  }

  changeActive(title: string): void {
    this.active = title;
  }

  ngOnInit(): void {
    this.setResults();
  }
}
