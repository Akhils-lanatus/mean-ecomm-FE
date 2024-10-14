import { AfterViewInit, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminCategoryService } from '../../../services/admin.category.service';
import { SuccessResponse } from '../../../shared/model/Api';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { noSpacesValidator } from '../../../shared/Validators/validations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-category-update',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class CategoryUpdateComponent implements AfterViewInit {
  id!: string
  router: ActivatedRoute = inject(ActivatedRoute)
  route: Router = inject(Router)
  AdminCategoryService: AdminCategoryService = inject(AdminCategoryService)
  categoryName: FormControl = new FormControl('', [Validators.required, noSpacesValidator()])
  ngAfterViewInit(): void {
    this.router.params.subscribe(res => this.id = res?.['id'])
    if (this.id) {
      this.AdminCategoryService.getCategoryById(this.id).subscribe({
        next: (res: SuccessResponse) => {
          this.categoryName.setValue(res.data.name)
          console.log(this.categoryName.value);

        },
        error: (err) => {
          this.route.navigate(['/admin/category'])
        }
      })
    }

  }

  updateCategory() {
    this.AdminCategoryService.updateCategory(this.id, { name: this.categoryName.value }).subscribe((res) => {
      if (res.success) [
        this.categoryName.reset(),
      ]
    });
  }

}
