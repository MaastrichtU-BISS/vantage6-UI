import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

enum types {
  bar = 'bar',
  line = 'line',
  area = 'area',
  pie = 'pie',
  doughnut = 'doughnut',
  bubble = 'bubble',
  polarArea = 'polarArea',
  radar = 'radar',
}

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss'],
})
export class DashboardItemComponent implements AfterViewInit {
  @Input() type!: string;
  @Input() title!: string;
  @Input() data!: any;

  chart: Chart | null = null;

  getData(type: types, data: any, title: string): any {
    switch (type) {
      case types.bar:
        return this.multiset(data);
      case types.line:
        return this.multiset(data);
      case types.pie:
        return this.uniset(data, title);
      case types.doughnut:
        return this.uniset(data, title);
      case types.polarArea:
        return this.uniset(data, title);
      case types.radar:
        return this.multiset(data);
      case types.bubble:
        return this.multiset(data, true);
      default:
        return [];
    }
  }

  multiset(data: any, radius: boolean = false): any {
    return {
      labels: data.x,
      datasets: data.datasets.map((ds: any) => {
        return {
          label: ds.label,
          data: !radius
            ? ds.y
            : data.x.map((x: any, index: number) => {
                return {
                  x: x,
                  y: ds.y[index],
                  r: ds.r[index],
                };
              }),
        };
      }),
    };
  }

  uniset(data: any, title: string): any {
    return {
      labels: data.x,
      datasets: [
        {
          label: title,
          data: data.y,
        },
      ],
    };
  }

  constructor() {}

  ngAfterViewInit(): void {
    const ele = document.getElementById(this.title) as HTMLCanvasElement | null;
    if (!ele) return;
    this.chart = new Chart(ele, {
      type: this.type as ChartType,
      data: this.getData(this.type as types, this.data, this.title),
    });
  }
}
