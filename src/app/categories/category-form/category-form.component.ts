import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode = false;
  categoryId: number | null = null;
  category: Category | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: SnackbarService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.categoryId = +id;
      this.categoryService.getCategoryById(this.categoryId).subscribe(category => {
        this.category = category;
        this.categoryForm.patchValue(category);
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) return;
    const formValue = this.categoryForm.value;

    if (this.isEditMode && this.categoryId) {
      this.categoryService.updateCategory(formValue).subscribe(() => {
        this.snackbar.show('Categoria atualizada com sucesso!', true);
        this.router.navigate(['/categorias']);
      });
    } else {
      this.categoryService.createCategory(formValue).subscribe(() => {
        this.snackbar.show('Categoria criada com sucesso!', true);
        this.router.navigate(['/categorias']);
      });
    }
  }
}