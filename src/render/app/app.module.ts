import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './pages/main/main.module';
import { OrganizationInfoModule } from './pages/organization-info/organization-info.module';
import { UpdateModule } from './pages/update/update.module';
import { ApiService } from './services/api.service';
import { ElectronService } from './services/electron.service';
import { OrganizationService } from './services/organization.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    OrganizationInfoModule,
    UpdateModule,
    HttpClientModule,
  ],
  providers: [ElectronService, OrganizationService, ApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
