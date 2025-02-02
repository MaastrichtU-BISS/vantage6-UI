import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';

import { UserPermissionService } from 'src/app/auth/services/user-permission.service';
import { getEmptyUser, User } from 'src/app/interfaces/user';
import { SignOutService } from 'src/app/services/common/sign-out.service';
import { SocketioMessageService } from 'src/app/services/common/socketio-message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  loggedin_user: User = getEmptyUser();

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    public userPermission: UserPermissionService,
    private signOutService: SignOutService,
    // NB: we register socket messages here so that they are shown in the
    // component, so KEEP IT (even though not doing anything else with it here)
    private socketioMessageService: SocketioMessageService
  ) {
    this.userPermission.isInitialized().subscribe((ready) => {
      if (ready) {
        this.loggedin_user = this.userPermission.user;
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  logout(): void {
    this.signOutService.signOut();
  }
}
