import { Component, OnInit } from '@angular/core';
import { UserPermissionService } from 'src/app/auth/services/user-permission.service';
import { Collaboration } from 'src/app/interfaces/collaboration';
import { EMPTY_USER, User } from 'src/app/interfaces/user';
import { allPages } from 'src/app/interfaces/utils';
import { CollabDataService } from 'src/app/services/data/collab-data.service';
import { environment } from 'src/environments/environment';
import packageJson from '../../../../package.json';
import { VersionApiService } from 'src/app/services/api/version-api.service';

@Component({
  selector: 'app-home-tiles',
  templateUrl: './home-tiles.component.html',
  styleUrls: ['./home-tiles.component.scss'],
})
export class HomeTilesComponent implements OnInit {
  api_url = environment.api_url;
  version: string = packageJson.version;
  server_version: string = '...';
  user: User = EMPTY_USER;
  collaborations: Collaboration[] = [];

  constructor(
    public userPermission: UserPermissionService,
    private versionApiService: VersionApiService,
    private collabDataService: CollabDataService
  ) {}

  ngOnInit(): void {
    this.userPermission.isInitialized().subscribe((ready: boolean) => {
      if (ready) {
        this.user = this.userPermission.user;
        this.initData();
      }
    });
  }

  async initData() {
    this.server_version = await this.versionApiService.getVersion();
    (
      await this.collabDataService.org_list(
        this.user.organization_id,
        true,
        allPages()
      )
    ).subscribe((collaborations) => {
      this.collaborations = collaborations;
    });
  }
}
