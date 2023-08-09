import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../state/selector/user.selector';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  currentUser$ = this.store.select(selectCurrentUser);
  public editMode: boolean = false;
  public user: User | null = null;

  public profileForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    lastname: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^\d{10}$/)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  })

  constructor(private store: Store, private auth: AuthService, private router: Router, private toastr: ToastrService) {
    this.currentUser$.subscribe({
      next: (user: User | null) => {
        if (user) {
          this.user = user;
          this.profileForm.patchValue(this.user);
        }
      }
    });
  }

  public closeProfile() {
    document.querySelector(".profile")?.classList.remove("opened")
  }

  public logout() {
    this.auth.logout();
    this.router.navigate(['auth', 'login']);
  }

  public updateUser() {
    if (this.profileForm.valid) {
      this.auth.updateUser({ ...this.profileForm.value, uid: this.user?.uid }).subscribe({
        next: () => {
          this.editMode = false;
          this.toastr.success('Profile info was updated correctly!');
        }
      })
    }
  }
}
