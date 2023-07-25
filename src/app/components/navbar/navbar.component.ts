import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs/operators';

import { UserPermissionService } from 'src/app/auth/services/user-permission.service';
import { getEmptyUser, User } from 'src/app/interfaces/user';
import { SignOutService } from 'src/app/services/common/sign-out.service';
import { SocketioMessageService } from 'src/app/services/common/socketio-message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
  loggedin_user: User = getEmptyUser();
  useSimpleLayout = false;
  isViewInitialized = false;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    router: Router,
    route: ActivatedRoute,
    private observer: BreakpointObserver,
    public userPermission: UserPermissionService,
    private signOutService: SignOutService,
    // NB: we register socket messages here so that they are shown in the
    // component, so KEEP IT (even though not doing anything else with it here)
    private socketioMessageService: SocketioMessageService
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.useSimpleLayout =
          !!route.root.firstChild?.snapshot.data['simpleLayout'];
      });
    this.userPermission.isInitialized().subscribe((ready) => {
      if (ready) {
        this.loggedin_user = this.userPermission.user;
      }
    });
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (!this.sidenav) {
          this.isViewInitialized = true;
          return;
        }
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
        this.isViewInitialized = true;
      });
  }

  logout(): void {
    this.signOutService.signOut();
  }
}
