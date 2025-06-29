import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { CompaniesListComponent } from './companies-list/companies-list.component';
import { CompanyFormComponent } from './company-form/company-form.component';

@NgModule({
  declarations: [
    CompaniesListComponent,
    CompanyFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    RouterModule.forChild([
      { path: '', component: CompaniesListComponent },
      { path: 'novo', component: CompanyFormComponent },
      { path: ':id/editar', component: CompanyFormComponent }
    ])
  ]
})
export class CompanyModule { }
