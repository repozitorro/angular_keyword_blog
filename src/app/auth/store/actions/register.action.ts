import {createAction, props} from '@ngrx/store';

import {ActionsType} from '../actionsType';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';

export const registerAction = createAction(
  ActionsType.REGISTER,
  props<{request: RegisterRequestInterface}>()
);

export const registerSuccessAction = createAction(
  ActionsType.REGISTER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
);

export const registerFailureAction = createAction(
  ActionsType.REGISTER_FAILURE,
  props<{errors: BackendErrorsInterface}>()
);

