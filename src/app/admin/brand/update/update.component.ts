import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SuccessResponse } from '../../../shared/model/Api';
import { noSpacesValidator } from '../../../shared/Validators/validations';
import { AdminBrandService } from '../../../services/admin.brand.service';

@Component({
  selector: 'app-brand-update',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class BrandUpdateComponent {
  id!: string
  router: ActivatedRoute = inject(ActivatedRoute)
  route: Router = inject(Router)
  AdminBrandService: AdminBrandService = inject(AdminBrandService)
  categoryName: FormControl = new FormControl('', [Validators.required, noSpacesValidator()])
  ngAfterViewInit(): void {
    this.router.params.subscribe(res => this.id = res?.['id'])
    if (this.id) {
      this.AdminBrandService.getBrandById(this.id).subscribe({
        next: (res: SuccessResponse) => {
          this.categoryName.setValue(res.data.name)
          console.log(this.categoryName.value);

        },
        error: (err: any) => {
          this.route.navigate(['/admin/brand'])
        }
      })
    }

  }

  updateCategory() {
    this.AdminBrandService.updateBrand(this.id, { name: this.categoryName.value }).subscribe((res) => {
      if (res.success) [
        this.categoryName.reset(),
      ]
    });
  }
}
