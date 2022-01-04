import {SettingsStateInterface} from '../types/settingsState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from '../../auth/store/actions/updateCurrentUser.action';

const initializeState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null
};

const settingsReducer = createReducer(
  initializeState,
  on(
    updateCurrentUserAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    updateCurrentUserSuccessAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    updateCurrentUserFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  )
);

export function reducer(state: SettingsStateInterface, action: Action) {
  return settingsReducer(state, action);
}
