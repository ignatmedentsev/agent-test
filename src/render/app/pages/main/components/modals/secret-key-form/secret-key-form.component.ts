import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ApiService } from '~render/services/api.service';
import { OrganizationService } from '~render/services/organization.service';

@Component({
  selector: 'app-key-form',
  templateUrl: './secret-key-form.component.html',
  styleUrls: ['./secret-key-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyFormComponent {
  public organizationSecretKey = '';

  constructor(
    public readonly dialogRef: MatDialogRef<KeyFormComponent>,
    private readonly router: Router,
    private readonly apiService: ApiService,
    private readonly organizationService: OrganizationService,
  ) {}

  public getOrganizationInfo() {
    this.apiService.getOrganizationInfo(this.organizationSecretKey)
      .subscribe({
        next: async (data) => {
          this.organizationService.setOrganizationInfo(data.organizationInfo);
          this.organizationService.setUserInfo(data.userInfo);

          this.dialogRef.close();

          await this.router.navigate(['organization-info']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public changeInput(event: Event) {
    this.organizationSecretKey = (event.target as HTMLInputElement).value;
  }
}
