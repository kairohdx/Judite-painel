import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgentsListComponent } from './agents-list/agents-list.component';
import { AgentFormComponent } from './agent-form/agent-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AgentsListComponent,
    AgentFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    RouterModule.forChild([
      { path: '', component: AgentsListComponent },
      { path: 'novo', component: AgentFormComponent },
      { path: ':id/editar', component: AgentFormComponent }
    ])
  ]
})
export class AgentsModule { }