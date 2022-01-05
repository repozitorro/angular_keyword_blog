import {createAction, props} from '@ngrx/store';
import {ActionTypes} from '../actionTypes';
import {ProfileInterface} from '../../../shared/types/profile.interface';

export const getUserProfileAction = createAction(
  ActionTypes.GET_USER_PROFILE,
  props<{username: string}>()
);

export const getUserProfileSuccessAction = createAction(
  ActionTypes.GET_USER_PROFILE_SUCCESS,
  props<{userProfile: ProfileInterface}>()
);

export const getUserProfileFailureAction = createAction(
  ActionTypes.GET_USER_PROFILE_FAILURE
);
