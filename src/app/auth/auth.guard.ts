import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../shared/state/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public loginPath: string = '/auth/login';
  constructor(
    private auth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private store: Store, // Your store service
    private router: Router // Router service
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.auth.authState.subscribe({
        next: (result: any) => {
          if (!result) {
            this.router.navigate([this.loginPath]); // Redirect to login page
            resolve(false);
            return;
          }

          this.afDatabase.object(`/users/${result.uid}`).valueChanges().subscribe({
            next: (user: any) => {
              this.store.dispatch(loginSuccess({ user: { ...user, uid: result.uid } }));
              resolve(true);
            },
            error: (error: any) => {
              console.error("Error fetching user data:", error);
              this.router.navigate([this.loginPath]); // Redirect to login page
              resolve(false);
            }
          });
        },
        error: (error: any) => {
          console.error("Error checking auth state:", error);
          this.router.navigate([this.loginPath]); // Redirect to login page
          resolve(false);
        }
      });
    });
  }
}
