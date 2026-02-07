import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from '../services/login.service';

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
        private messageService: MessageService,
        private loginservice: LoginService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: [false]
        });
    }

    ngOnInit() { }


    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Veuillez remplir tous les champs correctement'
            });
            return;
        }
        let payload=this.loginForm.getRawValue()
        this.router.navigate(['/admin/dashboard']);
        this.loginservice.loginUser(payload).subscribe(
            (data) => {
                console.log(data)
                localStorage.setItem('currentUser', JSON.stringify(data));

                if (data.response === "ADMIN") {
                    this.router.navigate(['/admin/dashboard']);

                } else if (data.response === "USER") {
                    this.router.navigate(['/ecommerce']);


                } else if (data.response === "password") {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Mot de passe incorrect'
                    });

                } else if (data.response === "disabled") {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Veuillez activer votre compte'
                    });

                } else {
                    // Si aucune des conditions précédentes n'est remplie, rediriger l'utilisateur vers le tableau de bord
                    this.router.navigate(['/admin/dashboard']);
                }
            },
            (error) => {
                if (error.status === 500) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Utilisateur non trouvé'
                    });

                }
            }
        );
    }


    goToSignup() {
        this.router.navigate(['/auth/signup']);
    }
} 