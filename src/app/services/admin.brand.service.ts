import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../shared/global';
import { SuccessResponse } from '../shared/model/Api';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminBrandService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getAllBrands(): Observable<SuccessResponse> {
    return this.http.get<SuccessResponse>(`${API_URL}/brand`).pipe(
      catchError(err => {
        this.toastr.error(err.error.message)
        return throwError(() => err)
      })
    )
  }
  addBrand(brand: any): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${API_URL}/brand`, {
      name: brand
    }).pipe(
      tap(res => {
        if (res.success) {
          this.toastr.success(res.message);
        }
      }),
      catchError(err => {
        this.toastr.error(err.error.message)
        return throwError(() => err)
      })
    )
  }
  deleteBrand(id: string): Observable<SuccessResponse> {
    return this.http.delete<SuccessResponse>(`${API_URL}/brand/${id}`).pipe(
      tap(res => {
        if (res.success) {
          this.toastr.success(res.message);
        }
      }),
      catchError(err => {
        this.toastr.error(err.error.message)
        return throwError(() => err)
      })
    )
  }
  getBrandById(id: string): Observable<SuccessResponse> {
    return this.http.get<SuccessResponse>(`${API_URL}/brand/${id}`).pipe(
      catchError(err => {
        this.toastr.error(err.error.message)
        return throwError(() => err)
      })
    )
  }
  updateBrand(id: string, brand: any): Observable<SuccessResponse> {
    return this.http.put<SuccessResponse>(`${API_URL}/brand/${id}`, {
      name: brand
    }).pipe(
      tap(res => {
        if (res.success) {
          this.toastr.success(res.message);
        }
      }),
      catchError(err => {
        this.toastr.error(err.error.message)
        return throwError(() => err)
      })
    )
  }

}
