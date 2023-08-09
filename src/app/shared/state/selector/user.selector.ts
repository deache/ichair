import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers/user.reducer';

export const selectCurrentUser = createSelector(
    (state: any) => state.auth,
    (appState: AppState) => appState.user
);
