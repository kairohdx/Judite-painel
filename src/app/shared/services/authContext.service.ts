import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Company } from '../models/company.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthContextService {
    private _user: User | null = null;
    private _company: Company | null = null;

    constructor(private authService: AuthService, private router: Router) {}

    setUser(user: User) {
        this._user = user;
        this._company = user.company || null;
    }

    get toolbarLinks() {
        if (this.isRoot()) {
            return [
                { label: 'Empresas', route: '/empresas' },
                { label: 'Usuários', route: '/usuarios' }
            ];
        }
        if (this.isAdmin()) {
            return [
                { label: 'Agentes', route: '/agentes' },
                { label: 'Categorias', route: '/categorias' },
                { label: 'Conhecimento', route: '/conhecimento' }
            ];
        }
        return [];
    }

    get user(): User | null {
        return this._user;
    }

    get company(): Company | null {
        return this._company;
    }

    isAdmin(): boolean {
        return this._user?.role === 'admin';
    }

    isRoot(): boolean {
        return this._user?.role === 'root';
    }

    isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    logout(): void {
        this.authService.logout();
        this._user = null;
        this._company = null;
        this.router.navigate(['/login']);
    }
}