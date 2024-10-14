import { Component } from '@angular/core';
import { AdminCategoryService } from '../../../services/admin.category.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { noSpacesValidator } from '../../../shared/Validators/validations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class CategoryAddComponent {
  constructor(private AdminCategoryService: AdminCategoryService) { }
  categoryName = new FormControl('', [Validators.required, noSpacesValidator()]);

  addCategory() {
    this.AdminCategoryService.addCategory(this.categoryName.value).subscribe((res) => {
      if (res.success) {
        this.categoryName.reset()
      }
    });
  }
}