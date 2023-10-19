import { Component, OnInit } from '@angular/core';

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
  dashboard_schema: DashboardSchema[] | null = null;
  loaded: boolean = false;
  active: string = '';

  loadData(): void {
    fetch('../../../assets/dashboard_schema.json')
      .then((file) => {
        file.json().then((json) => {
          this.dashboard_schema = json;
          this.loaded = true;
          if (this.dashboard_schema && this.dashboard_schema.length)
            this.active = this.dashboard_schema[0].title;
        });
      })
      .catch((error) => {
        this.loaded = false;
      })
      .finally(() => {
        this.loaded = false;
      });
  }

  changeActive(title: string): void {
    this.active = title;
  }

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }
}
