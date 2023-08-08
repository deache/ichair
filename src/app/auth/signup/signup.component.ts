import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/shared/validators/password-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    lastname: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^\d{10}$/)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required, this.passwordMatchValidator()]),
  })
  constructor(private _auth: AuthService, private toastr: ToastrService, private router: Router) {
  }

  public createUser() {
    if (this.registerForm.valid) {
      const { email, password, confirmPassword, ...user } = this.registerForm.value;
      this._auth.createUser(email, password, user).subscribe({
        next: (response) => {
          this.toastr.success('Success!', 'Your account was created!');
          this.router.navigate(['']);
        }
      });
    }
  }

  private passwordMatchValidator(): ValidatorFn {
    return (): ValidationErrors | null => {
      const password = this.registerForm?.get('password')?.value;
      const confirmPassword = this.registerForm?.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }
}
