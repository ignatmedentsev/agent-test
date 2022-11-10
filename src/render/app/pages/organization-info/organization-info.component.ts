import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import type { IOrganizationInfo, IUserInfo } from '~common/interfaces';

import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-organization-info',
  templateUrl: './organization-info.component.html',
  styleUrls: ['./organization-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationInfoComponent implements OnInit {
  public organizationInfo: IOrganizationInfo;
  public userInfo: IUserInfo;

  constructor(
    private readonly router: Router,
    private readonly organizationService: OrganizationService,
  ) {}

  public ngOnInit() {
    this.organizationInfo = this.organizationService.getOrganizationInfo();
    this.userInfo = this.organizationService.getUserInfo();
  }

  public async goBack() {
    await this.router.navigate(['']);
  }
}
