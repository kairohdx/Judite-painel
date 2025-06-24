import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsListComponent } from './agents/agents-list/agents-list.component';
import { AgentFormComponent } from './agents/agent-form/agent-form.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { KnowledgeListComponent } from './knowledge/knowledge-list/knowledge-list.component';
import { KnowledgeFormComponent } from './knowledge/knowledge-form/knowledge-form.component';

const routes: Routes = [
  { path: 'agentes', component: AgentsListComponent },
  { path: 'agentes/novo', component: AgentFormComponent },
  { path: 'categorias', component: CategoriesListComponent },
  { path: 'categorias/novo', component: CategoryFormComponent },
  { path: 'conhecimento', component: KnowledgeListComponent },
  { path: 'conhecimento/novo', component: KnowledgeFormComponent },
  { path: '', redirectTo: '/agentes', pathMatch: 'full' },
  { path: '**', redirectTo: '/agentes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }