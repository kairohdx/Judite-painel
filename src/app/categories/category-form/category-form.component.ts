import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  isEditing: boolean = false;
  categoryId: number | null = null;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Logic to check if editing an existing category can be added here
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const category: Category = {
        id: this.categoryId,
        name: this.categoryForm.value.name
      };

      if (this.isEditing) {
        this.categoryService.updateCategory(category).subscribe(() => {
          // Handle successful update
        });
      } else {
        this.categoryService.createCategory(category).subscribe(() => {
          // Handle successful creation
        });
      }
    }
  }
}