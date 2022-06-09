import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  serviceURL = 'http://localhost:8080';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  user = new User();

  constructor(private http: HttpClient) { }

  //Felhasználó létrehozása
  createUser(data): Observable<any> {
    const url = `${this.serviceURL}/addUser`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  //Összes felhasználó lekérdezése
  getUsers() {
    return this.http.get(`${this.serviceURL}/getallUser`);
  }

  //Adott felhasználó lekérdezése a megadott ID alapján
  getUser(id): Observable<any> {
    const url = `${this.serviceURL}/getUser/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  //Munkavállaló létrehozása
  createEmployee(data): Observable<any> {
    const url = `${this.serviceURL}/addEmployee`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  //Munkavállaló lekérdezése
  getEmployee() {
    return this.http.get(`${this.serviceURL}/getEmployee`);
  }

  //Bejelentkezett felhasználó értékének beállítása
  setLoggedInUser(user){
    this.user = user;
  }

  //Bejelentkezett felhasználó lekérdezése
  getLoggedInUser(){
    return this.user;
  }

  //Hibakezelés
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage);
    return throwError(errorMessage);
  }
}
