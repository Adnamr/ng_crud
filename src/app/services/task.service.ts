import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Task} from '../models/task';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

const BASE_URL = 'http://localhost:3000/posts';


@Injectable({
  providedIn: 'root'
})


export class TaskService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]>
  {
    return this.http.get<Task[]>(BASE_URL);
  }

  delete(id: number): Observable<any>
  {
    return this.http.delete(`${BASE_URL}/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  create(data: Task): Observable<any>
  {
    return this.http.post(BASE_URL, data ).pipe(
      catchError(this.errorHandler)
    );
  }

  update(id: number | undefined, data: Task): Observable<any>
  {
    return this.http.put(`${BASE_URL}/${id}`, data).pipe(
      catchError(this.errorHandler)
    );
  }

  toggleStatus(id: number | undefined, completed: boolean)
  {
    return this.http.patch(`${BASE_URL}/${id}`, {completed: !completed}).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
