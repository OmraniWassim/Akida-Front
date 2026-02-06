import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { AppUser } from '../models/AppUser';




@Injectable({providedIn: 'root'})

export class AppUserService {

  private apiServerUrl = "http://192.168.56.20:8080/api/v1";

  constructor(private http: HttpClient){}

  public getAppUsers(): Observable<AppUser[]> {
      return this.http.get<AppUser[]>(`${this.apiServerUrl}/registration/all`);
  }

  public addAppUser(appUser:AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(`${this.apiServerUrl}/registration/add`,appUser);
  }


  public updateAppUser(id:number,appUser:AppUser): Observable<void> {
    return this.http.put<void>(`${this.apiServerUrl}/registration/update/${id}`,appUser);
  }

  public deleteAppUser(id:number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/registration/delete/${id}`);
  }

//   getAppUsersByRole(role: string): Observable<manager[]> {
//     return this.http.get<manager[]>(`${this.apiServerUrl}/registration/all/${role}`);
//   }

  getByID(id:number):Observable<AppUser>{
    return this.http.get<AppUser>(`${this.apiServerUrl}/registration/find/${id}`)
  }

//   updatePassword(id: number,  pwdRequest: PwdRequest): Observable<any> {
//     return this.http.put<any>(`${this.apiServerUrl}/registration/updatePWD/${id}`,pwdRequest);
//   }


}