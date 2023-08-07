import { createAction, props } from '@ngrx/store';
import { User } from '../interfaces/user.interface';


export const loginSuccess = createAction('[User] Login Success', props<{ user: User }>());

export const logout = createAction('[User] Logout');
