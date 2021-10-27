import {createAction, props} from '@ngrx/store';
import {ActionsType} from '../actionsType';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';

export const getCurrentUserAction = createAction(ActionsType.GET_CURRENT_USER);

export const getCurrentUserSuccessAction = createAction(
  ActionsType.GET_CURRENT_USER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
);

export const getCurrentUserFailureAction = createAction(ActionsType.GET_CURRENT_USER_FAILURE);
