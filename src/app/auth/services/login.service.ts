import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { AppUserRole } from 'src/app/administration/enum/AppUserRole.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiServerUrl = "http://192.168.56.20:8081/api/v1";

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public loginUser(user): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/registration/login`, user);
  }

  isUserLoggedAndAccessTokenValid(): boolean {
 {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const { token } = JSON.parse(currentUser);
        const decodedToken: JwtPayload = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          // Token expiré, supprimez l'utilisateur actuel et redirigez-le vers la page de connexion
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
          return false;
        }
    
        // Vérifiez le rôle de l'utilisateur
        const roles: string[] = [AppUserRole.ADMIN];
        if (roles.includes(AppUserRole.ADMIN)) {
          // L'utilisateur a le rôle de Super, autorisez l'accès à la page d'inscription
          return true;
        } else {
          // L'utilisateur n'a pas le rôle de Super, redirigez-le vers une page d'erreur ou de connexion
          this.router.navigate(['/pages-faq']);
          return false;
        }
      }
    
      // User is not logged in
      this.router.navigate(['/login']);
      return false;
    }
    
  }
  logoutUser() {
    localStorage.removeItem('currentUser');
  }

  
}