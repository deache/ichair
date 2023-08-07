import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from '../actions/user.actions';
import { User } from '../interfaces/user.interface';

export const initialState: User | null = null;

export const userReducer = createReducer<User | null>(
    initialState,
    on(loginSuccess, (state, { user }) => user),
    on(logout, () => initialState)
);
