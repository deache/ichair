import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from '../actions/user.actions';

export interface AuthState {
    user: any; // User object or null
}

const initialState: AuthState = {
    user: null,
};

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { user }) => ({ ...state, user })),
    on(logout, state => ({ ...state, user: null }))
);
