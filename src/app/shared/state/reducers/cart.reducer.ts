import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';
import { initialState } from './user.reducer';

export const cartReducer = createReducer(
    initialState,
    on(CartActions.loadCart, (state) => state),
    on(CartActions.addItemToCart, (state, { cartItem }) => ({
        ...state,
        cartItems: [...state.cartItems, cartItem],
    })),
    on(CartActions.removeItemFromCart, (state, { sku }) => ({
        ...state,
        cartItems: state.cartItems.filter((item) => item.product.sku !== sku),
    }))
);
