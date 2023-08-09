import { createAction, props } from '@ngrx/store';
import { Cart } from 'src/app/interfaces/cart.interface';

// Load Cart Action
export const loadCart = createAction('[Cart] Load Cart');

// Add Item to Cart Action
export const addItemToCart = createAction(
    '[Cart] Add Item to Cart',
    props<{ cartItem: Cart }>()
);

// Remove Item from Cart Action
export const removeItemFromCart = createAction(
    '[Cart] Remove Item from Cart',
    props<{ sku: string }>()
);
