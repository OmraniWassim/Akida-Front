import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<any> {
    // Simuler une requête d'authentification
    return new Observable(observer => {
      // Pour le moment, on simule une connexion réussie
      setTimeout(() => {
        const token = 'fake-jwt-token';
        localStorage.setItem('token', token);
        this.isAuthenticatedSubject.next(true);
        observer.next({ token });
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
} 