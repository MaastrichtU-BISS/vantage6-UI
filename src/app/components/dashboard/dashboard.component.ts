import { Component, OnInit } from '@angular/core';

type DashBoardData = {
  type: string;
  value: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data: DashBoardData[] = [];

  constructor() {}

  loadData(): void {
    fetch('../../../assets/dashboard_data.json').then((file) => {
      file.json().then((json) => {
        this.data = json;
        console.log(this.data);
      });
    });
  }

  ngOnInit(): void {
    this.loadData();
  }
}
