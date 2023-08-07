import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  })
  constructor(private _auth: AuthService) {

  }

  public createUser() {
    if (this.registerForm.valid) {
      const { email, password, confirmPassword, ...user } = this.registerForm.value;
      this._auth.createUser(email, password, user).subscribe({
        next: (response) => console.log(response)
      });
    }
  }
}
