import { createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/user.reducer';

export const selectAuthState = (state: any) => state.auth;

export const selectCurrentUser = createSelector(
    selectAuthState,
    (authState: AuthState) => authState.user
);
