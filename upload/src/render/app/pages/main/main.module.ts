import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { KeyFormComponent } from './components/modals/secret-key-form/secret-key-form.component';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent,
    KeyFormComponent,
  ],
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
  ],
  providers: [],
})
export class MainModule {}
