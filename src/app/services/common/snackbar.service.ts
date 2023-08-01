import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { routePaths } from 'src/app/routes';
import { Sentiment } from 'src/app/shared/enum';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  // Snackbar that opens with success background
  openNodeStatusSnackBar(msg: string, data: any, online: boolean) {
    let panelClass = online ? ['green-snackbar'] : ['red-snackbar'];
    const sb = this.snackBar.open(msg, 'View node', {
      verticalPosition: 'top',
      duration: 10000,
      panelClass: panelClass,
    });

    // define what happens if users click the button
    sb.onAction().subscribe(() => {
      this.router.navigate([routePaths.node[0], data.org_id, data.id]);
    });
  }

  openTaskMessageSnackBar(
    msg: string,
    sentiment: Sentiment,
    task_id: number,
    organization_id: number
  ) {
    let panelClass = ['blue-snackbar'];
    if (sentiment === Sentiment.POSITIVE) {
      panelClass = ['green-snackbar'];
    } else if (sentiment === Sentiment.NEGATIVE) {
      panelClass = ['red-snackbar'];
    }
    const sb = this.snackBar.open(msg, 'View task', {
      verticalPosition: 'top',
      duration: 10000,
      panelClass: panelClass,
    });

    sb.onAction().subscribe(() => {
      this.router.navigate([routePaths.task, organization_id, task_id]);
    });
  }
}
