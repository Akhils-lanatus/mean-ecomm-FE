import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IBrand } from '../../../shared/model/Interface';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AdminBrandService } from '../../../services/admin.brand.service';

@Component({
  selector: 'app-brand-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class BrandHomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['_id', 'name', 'actions'];
  dataSource!: MatTableDataSource<IBrand>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminBrandService: AdminBrandService, private router: Router) { }

  ngAfterViewInit() {

    this.getAllBrands()
  }

  getAllBrands() {
    this.adminBrandService.getAllBrands().subscribe(data => {
      this.dataSource = new MatTableDataSource(this.formatDataSource(data.data));
      this.dataSource
        .sort = this.sort;
      this.dataSource
        .paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  formatDataSource(data: any) {
    return data.map((item: any, index: number) => {
      return {
        _id: index + 1,
        name: item.name,
        originalId: item._id,
      };
    });
  }
  updateBrand(id: string) {
    let url = `/admin/brand/update/${id}`
    this.router.navigate([url]);
  }

  deleteCategory(id: string) {
    this.adminBrandService.deleteBrand(id).subscribe(x => {
      if (x.success) {
        this.getAllBrands()
      }
    })
  }
}
