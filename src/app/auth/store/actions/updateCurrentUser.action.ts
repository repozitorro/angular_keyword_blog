import {createAction, props} from '@ngrx/store';
import {ActionsType} from '../actionsType';
import {CurrentUserInputInterface} from '../../../shared/types/currentUserInput.interface';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';

export const updateCurrentUserAction = createAction(
  ActionsType.UPDATE_CURRENT_USER,
  props<{currentUserInput: CurrentUserInputInterface}>()
);

export const updateCurrentUserSuccessAction = createAction(
  ActionsType.UPDATE_CURRENT_USER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
);

export const updateCurrentUserFailureAction = createAction(
  ActionsType.UPDATE_CURRENT_USER_FAILURE,
  props<{errors: BackendErrorsInterface}>()
);

