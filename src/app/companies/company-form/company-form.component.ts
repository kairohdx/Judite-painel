import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../shared/services/company.service';
import { Company } from '../../shared/models/company.model';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  @Input() company: Company | null = null;
  companyForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
      this.companyForm = this.fb.group({
        name: [this.company?.name || '', Validators.required],
        sector: [this.company?.sector || '', Validators.required],
        cnpj: [this.company?.cnpj || ''],
        email: [this.company?.email || '']
      });
  }

  onSubmit(): void {
    if (this.companyForm.invalid) return;

    const formValue = this.companyForm.value;
    if (this.company && this.company.id) {
      this.companyService.updateCompany(this.company.id, formValue).subscribe(() => {
        this.snackbar.show('Empresa atualizada com sucesso!', true);
        this.router.navigate(['/empresas']);
      });
    } else {
      this.companyService.createCompany(formValue).subscribe(() => {
        this.snackbar.show('Empresa criada com sucesso!', true);
        this.router.navigate(['/empresas']);
      });
    }
  }
}
