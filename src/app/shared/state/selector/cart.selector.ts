import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers/user.reducer';

export const selectCart = (state: AppState) => state.cartItems;

export const selectCartItems = createSelector(
    (state: any) => state.cart,
    (appState: AppState) => appState.cartItems
);
