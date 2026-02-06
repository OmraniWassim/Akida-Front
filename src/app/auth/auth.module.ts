import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

// PrimeNG Modules
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { MessageService } from 'primeng/api';

// Components
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        // PrimeNG Modules
        CardModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        PasswordModule,
        DividerModule,
        ToastModule,
        StepsModule
    ],
    providers: [MessageService]
})
export class AuthModule { } 