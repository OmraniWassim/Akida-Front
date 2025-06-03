import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading: boolean = false;
    returnUrl: string;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private authService: AuthService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: [false]
        });
    }

    ngOnInit() {
        // Récupérer l'URL de retour depuis les paramètres de requête ou utiliser '/admin/dashboard' par défaut
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.loading = true;
            const { email, password } = this.loginForm.value;

            this.authService.login(email, password).subscribe({
                next: () => {
                    this.loading = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Connexion réussie!'
                    });
                    this.router.navigate([this.returnUrl]);
                },
                error: (error) => {
                    this.loading = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Échec de la connexion. Veuillez vérifier vos identifiants.'
                    });
                }
            });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Veuillez remplir tous les champs correctement'
            });
        }
    }

    goToSignup() {
        this.router.navigate(['/auth/signup']);
    }
} 