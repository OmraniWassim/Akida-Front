import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [MessageService]
})
export class SignupComponent implements OnInit {
    activeIndex: number = 0;
    signupForm: FormGroup;
    loading: boolean = false;
    items: MenuItem[];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private messageService: MessageService
    ) {
        this.items = [
            {
                label: 'Informations personnelles',
                routerLink: 'personal'
            },
            {
                label: 'Informations de connexion',
                routerLink: 'account'
            },
            {
                label: 'Confirmation',
                routerLink: 'confirmation'
            }
        ];
    }

    ngOnInit() {
        this.signupForm = this.fb.group({
            // Étape 1: Informations personnelles
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],

            // Étape 2: Informations de connexion
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],

            // Étape 3: Informations professionnelles
            company: [''],
            position: [''],
            industry: [''],

            // Étape 4: Conditions
            terms: [false, Validators.requiredTrue]
        }, { validator: this.passwordMatchValidator });
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password')?.value === g.get('confirmPassword')?.value
            ? null
            : { mismatch: true };
    }

    nextStep() {
        if (this.activeIndex < this.items.length - 1) {
            this.activeIndex++;
        }
    }

    prevStep() {
        if (this.activeIndex > 0) {
            this.activeIndex--;
        }
    }

    onSubmit() {
        if (this.signupForm.invalid) {
            return;
        }

        this.loading = true;
        // Simulation de l'inscription
        setTimeout(() => {
            this.loading = false;
            this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Inscription réussie'
            });
            this.router.navigate(['/admin/dashboard']);
        }, 1500);
    }

    goToLogin() {
        this.router.navigate(['/auth/login']);
    }
} 