import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) {
  }

  public login() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: () => this.router.navigate(['']),
        error: () => this.toastr.error('Incorrect username or password')
      });
    }
  }
}
