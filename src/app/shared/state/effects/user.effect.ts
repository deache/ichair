import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { loginSuccess } from '../actions/user.actions';
import { User } from '../../../interfaces/user.interface';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private afDatabase: AngularFireDatabase) { }

    // Effect to fetch user data from the Realtime Database and trigger login success action
    fetchUserData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginSuccess),
            switchMap(({ user }) =>
                this.afDatabase.object<User>(`/users/${user.uid}`).valueChanges()
                    .pipe(
                        map((userData) => loginSuccess({ user: { ...user, ...userData } }))
                    )
            )
        )
    );
}
