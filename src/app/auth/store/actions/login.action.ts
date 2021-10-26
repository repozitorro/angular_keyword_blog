import {createAction, props} from '@ngrx/store';
import {ActionsType} from '../actionsType';

import {LoginRequestInterface} from '../../types/login-request.interface';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';

export const loginAction = createAction(
  ActionsType.LOGIN,
  props<{request: LoginRequestInterface}>()
);

export const loginSuccessAction = createAction(
  ActionsType.LOGIN_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
);

export const loginFailureAction = createAction(
  ActionsType.REGISTER_FAILURE,
  props<{errors: BackendErrorsInterface}>()
);
