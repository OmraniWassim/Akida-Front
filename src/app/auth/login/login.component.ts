import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private messageService: MessageService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: [false]
        });
    }

    ngOnInit() {}

    onSubmit() {
        if (this.loginForm.valid) {
            this.loading = true;
            // Simuler une connexion réussie
            setTimeout(() => {
                this.loading = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Connexion réussie!'
                });
                // Redirection vers le module d'administration
                this.router.navigate(['/admin/dashboard']);
            }, 1000);
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