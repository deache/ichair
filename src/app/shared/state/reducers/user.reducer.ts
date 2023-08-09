import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from '../actions/user.actions';
import { User } from 'src/app/interfaces/user.interface';
import { Cart } from 'src/app/interfaces/cart.interface';

export interface AppState {
    user: User | null;
    cartItems: Cart[]
}

export const initialState: AppState = {
    user: null,
    cartItems: [],
};

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { user }) => ({ ...state, user })),
    on(logout, state => ({ ...state, user: null }))
);
