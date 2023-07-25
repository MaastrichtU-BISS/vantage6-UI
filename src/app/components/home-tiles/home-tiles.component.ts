import { Component, OnInit } from '@angular/core';
import { UserPermissionService } from 'src/app/auth/services/user-permission.service';
import { Collaboration } from 'src/app/interfaces/collaboration';
import { EMPTY_USER, User } from 'src/app/interfaces/user';
import { allPages } from 'src/app/interfaces/utils';
import { CollabDataService } from 'src/app/services/data/collab-data.service';

@Component({
  selector: 'app-home-tiles',
  templateUrl: './home-tiles.component.html',
  styleUrls: ['./home-tiles.component.scss'],
})
export class HomeTilesComponent implements OnInit {
  loggedin_user: User = EMPTY_USER;
  collaborations: Collaboration[] = [];

  constructor(
    public userPermission: UserPermissionService,
    private collabDataService: CollabDataService
  ) {}

  ngOnInit(): void {
    this.userPermission.isInitialized().subscribe((ready: boolean) => {
      if (ready) {
        this.loggedin_user = this.userPermission.user;
        this.initData();
      }
    });
  }

  async initData() {
    (
      await this.collabDataService.org_list(
        this.loggedin_user.organization_id,
        true,
        allPages()
      )
    ).subscribe((collaborations) => {
      this.collaborations = collaborations;
    });
  }
}
