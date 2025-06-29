import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  @Input() user: User | null = null;
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const companyId = this.route.snapshot.paramMap.get('companyId');
    this.userForm = this.fb.group({
      name: [this.user?.name || '', [Validators.required, Validators.minLength(3)]],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      password: ['', this.user ? [] : [Validators.required, Validators.minLength(6)]],
      company_id: [companyId ? Number(companyId) : this.user?.company_id || null]
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;
    if (this.user) {
      // Editar usuário
      this.userService.updateUser(this.user.id, formValue).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    } else {
      // Novo usuário
      this.userService.createUser(formValue).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    }
  }
}
