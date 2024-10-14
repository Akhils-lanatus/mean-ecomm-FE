import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../shared/global';
import { SuccessResponse } from '../shared/model/Api';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getAllCategories(): Observable<SuccessResponse> {
    return this.http.get<SuccessResponse>(`${API_URL}/category`).pipe(
      catchError(err => {
        this.toastr.error(err.error.message)
        return throwError(() => err)
      })
    )
  }
  addCategory(category: any): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${API_URL}/category`, {
      name: category
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
  deleteCategory(id: string): Observable<SuccessResponse> {
    return this.http.delete<SuccessResponse>(`${API_URL}/category/${id}`).pipe(
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
  getCategoryById(id: string): Observable<SuccessResponse> {
    return this.http.get<SuccessResponse>(`${API_URL}/category/${id}`).pipe(
      catchError(err => {
        this.toastr.error(err.error.message)
        return throwError(() => err)
      })
    )
  }
  updateCategory(id: string, category: any): Observable<SuccessResponse> {
    return this.http.put<SuccessResponse>(`${API_URL}/category/${id}`, {
      name: category
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
