import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KnowledgeListComponent } from './knowledge-list/knowledge-list.component';
import { KnowledgeFormComponent } from './knowledge-form/knowledge-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    KnowledgeListComponent,
    KnowledgeFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    RouterModule.forChild([
      { path: '', component: KnowledgeListComponent },
      { path: 'novo', component: KnowledgeFormComponent },
      { path: ':id/editar', component: KnowledgeFormComponent }
    ])
  ]
})
export class KnowledgeModule { }