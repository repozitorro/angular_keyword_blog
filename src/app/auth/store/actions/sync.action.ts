import {createAction} from '@ngrx/store';
import {ActionsType} from '../actionsType';

export const logoutAction = createAction(ActionsType.LOGOUT);
