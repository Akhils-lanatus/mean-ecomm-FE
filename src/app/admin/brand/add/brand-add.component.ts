import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { noSpacesValidator } from '../../../shared/Validators/validations';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AdminBrandService } from '../../../services/admin.brand.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-brand-add',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './brand-add.component.html',
  styleUrl: './brand-add.component.scss'
})
export class BrandAddComponent {
  constructor(private AdminBrandService: AdminBrandService) { }
  brandName = new FormControl('', [Validators.required, noSpacesValidator()]);

  addBrand() {
    this.AdminBrandService.addBrand(this.brandName.value).subscribe(res => {
      if (res.success) {
        this.brandName.reset()
      }
    });
  }
}