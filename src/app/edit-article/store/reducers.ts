import {EditArticleStateInterface} from '../types/editArticleState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {updateArticleAction, updateArticleFailureAction, updateArticleSuccessAction} from './actions/updateArticle.action';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from './actions/getArticle.action';

const initialState: EditArticleStateInterface = {
  isLoading: false,
  isSubmitting: false,
  validationErrors: null,
  article: null
};

const editArticleReducer = createReducer(
  initialState,
  on(
    updateArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    updateArticleSuccessAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      article: null
    })
  ),
  on(
    updateArticleFailureAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(
    getArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: true,
      isLoading: true
    }),
  ),
  on(
    getArticleSuccessAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoading: false,
      article: action.article
    }),
  ),
  on(
    getArticleFailureAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
);

export function reducer(state: EditArticleStateInterface, action: Action) {
  return editArticleReducer(state, action);
}
