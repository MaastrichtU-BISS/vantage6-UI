import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';

// type DashBoardData = {
//   type: string;
//   value: any;
// };

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // data: DashBoardData[] = [];

  data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  chart: any = null;

  constructor() {}

  loadData(): void {
    // fetch('../../../assets/dashboard_data.json').then((file) => {
    //   file.json().then((json) => {
    //     this.data = json;
    //     console.log(this.data);
    //   });
    // });
  }

  ngOnInit(): void {
    this.loadData();
    const ele = document.getElementById(
      'acquisitions'
    ) as HTMLCanvasElement | null;
    if (!ele) return;
    this.chart = new Chart(ele, {
      type: 'bar',
      data: {
        labels: this.data.map((row) => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: this.data.map((row) => row.count),
          },
        ],
      },
    });
  }
}
