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

  loadData(): void {
    fetch('../../../assets/dashboard_schema.json')
      .then((file) => {
        file.json().then((json) => {
          this.dashboard_schema = json;
          this.loaded = true;
        });
      })
      .catch((error) => {
        this.loaded = false;
      })
      .finally(() => {
        this.loaded = false;
      });
  }

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }
}
