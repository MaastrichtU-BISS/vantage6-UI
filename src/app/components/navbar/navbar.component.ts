import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs/operators';

import { UserPermissionService } from 'src/app/auth/services/user-permission.service';
import { getEmptyUser, User } from 'src/app/interfaces/user';
import { routePaths } from 'src/app/routes';
import { SignOutService } from 'src/app/services/common/sign-out.service';
import { SocketioMessageService } from 'src/app/services/common/socketio-message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: { '[class.full-layout]': 'useFullLayout' },
})
export class NavbarComponent implements AfterViewInit {
  routes = routePaths;
  loggedin_user: User = getEmptyUser();
  useFullLayout: boolean = false;
  isGlobalSetting: boolean = false;
  isMobile: boolean = false;

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
      .subscribe((event) => {
        const previousLayout = this.useFullLayout;
        this.useFullLayout =
          !!route.root.firstChild?.snapshot.data['fullLayout'];
        this.isGlobalSetting = !!(event as NavigationEnd).url.includes(
          'settings'
        );
        if (previousLayout !== this.useFullLayout) {
          setTimeout(() => {
            this.handleSideNavChange(
              this.observer.isMatched('(max-width: 800px)')
            );
          }, 1);
        }
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
        this.handleSideNavChange(res.matches);
      });
  }

  logout(): void {
    this.signOutService.signOut();
  }

  handleSideNavChange(mobile: boolean) {
    this.isMobile = mobile;
    if (mobile) {
      this.sidenav?.close();
    } else {
      this.sidenav?.open();
    }
  }
}
