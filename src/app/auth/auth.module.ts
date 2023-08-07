import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
// import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  // { path: "signup", component: SignupComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    LoginComponent,
    // SignupComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
