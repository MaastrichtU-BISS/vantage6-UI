import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class NavbarComponent implements OnInit, AfterViewInit {
  routes = routePaths;
  loggedin_user: User = getEmptyUser();
  useFullLayout: boolean = false;
  isAdministration: boolean = false;
  isMobile: boolean = false;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    route: ActivatedRoute,
    private router: Router,
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
        if((event as NavigationEnd).url === routePaths.start) {
          this.isAdministration = false;
          sessionStorage.setItem('isAdministration', String(false));
        }

        const previousLayout = this.useFullLayout;
        this.useFullLayout = !!route.root.firstChild?.snapshot.data['fullLayout'];
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

  ngOnInit(): void {
    const isAdministration = sessionStorage.getItem('isAdministration');
    if (isAdministration) {
      this.isAdministration = isAdministration  === 'true';
    } else {
      this.isAdministration = false;
      this.router.navigate([routePaths.start]);
    }
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

  handleLayoutSwitchClick(isAdministration: boolean) {
    this.isAdministration = isAdministration;
    sessionStorage.setItem('isAdministration', String(isAdministration));  
    if(this.isAdministration) {
      this.router.navigate([routePaths.home]);
    } else {
      this.router.navigate([routePaths.start]);
    }
  }
}
