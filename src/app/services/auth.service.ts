import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from "@angular/common/http";




@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = "http://localhost:5000/auth";

 
  constructor(
    private http: HttpClient,
    private router: Router,
   
  ) {}
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };


  private isAuthenticated = false;
  private userRole: string | null = null;




  async register(email: any, password: any): Promise<any> {

    const role =  this.getUserRole(email)
    console.log(role)
    console.log(password)
    console.log(email)
   
    try {

      const data = { email, password, role: role};
      const response =this.http.post(`${this.url}/register`,data , this.httpOptions)
      return response;

    } 
    catch (error) {

      throw error;

    }
   
    
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  setRole(role: string): void {
    localStorage.setItem('role', role)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {

    return this.getToken() !== null;
    
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  
  login({ email, password }: any): Observable<any> {
      const loginData = { email, password };
  
      try {
          // Send a POST request to the server to authenticate the user
          const response = this.http.post<any>(`${this.url}/login`, loginData, this.httpOptions);
  
          response.subscribe((userData) => {
              if (userData.role === 'admin') {
                  this.setToken('abcdefghijklmnopqrstuvwxyz');
                  this.setRole(userData.role);
                  this.router.navigate(['/admin']);
              } else {
                  this.setToken('abcdefghijklmnopqrstuvwxyz');
                  this.setRole('alumni');
                  this.router.navigate(['/alumni']);
              }
          });
  
          return response;
      } catch (error) {
          this.isAuthenticated = false;
          return throwError(new Error('Failed to login'));
      }
  }

  
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
 
  getUserRole(email: any): any {
   

    const domain = email.split('@')[1]
    if(domain === '@tut4life.ac.za' ){
      const role = 'Alumni';
      return this.userRole = role;

    }
    else if(domain === '@tut.ac.za'){
      const role = 'Admin';
      return this.userRole = role;

    } 
  }

 

}