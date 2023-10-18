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

  getData(type: types, data: any): any {
    switch (type) {
      case types.bar:
        return data.y;
      case types.line:
        return data.y;
      case types.pie:
        return data.y;
      case types.doughnut:
        return data.y;
      case types.polarArea:
        return data.y;
      case types.radar:
        return data.y;
      case types.bubble:
        return data.x.map((x: any, index: number) => {
          return {
            x: x,
            y: data.y[index],
            r: data.r[index],
          };
        });
      default:
        return [];
    }
  }

  constructor() {}

  ngAfterViewInit(): void {
    const ele = document.getElementById(this.title) as HTMLCanvasElement | null;
    if (!ele) return;
    this.chart = new Chart(ele, {
      type: this.type as ChartType,
      data: {
        labels: this.data.x,
        datasets: [
          {
            label: this.title,
            data: this.getData(this.type as types, this.data),
          },
        ],
      },
    });
  }
}
