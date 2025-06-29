import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { adminGuard } from './shared/guards/admin.guard';
import { RootGuard } from './shared/guards/root.guard';

const routes: Routes = [
  { path: 'usuarios', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate: [RootGuard] },
  { path: 'empresas', loadChildren: () => import('./companies/company.module').then(m => m.CompanyModule), canActivate: [RootGuard] },
  { path: 'categorias', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule), canActivate: [adminGuard] },
  { path: 'conhecimento', loadChildren: () => import('./knowledge/knowledge.module').then(m => m.KnowledgeModule), canActivate: [adminGuard] },
  { path: 'agentes', loadChildren: () => import('./agents/agents.module').then(m => m.AgentsModule), canActivate: [adminGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }