import {createAction, props} from '@ngrx/store';
import {ActionType} from '../actionType';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {ArticleRequestInterface} from '../../../shared/types/articleRequest.interface';

export const createArticleAction = createAction(
  ActionType.CREATE_ARTICLE,
  props<{ article: ArticleRequestInterface }>()
);

export const createArticleSuccessAction = createAction(
  ActionType.CREATE_ARTICLE_SUCCESS,
  props<{ articleResponse: ArticleInterface }>()
);

export const createArticleFailureAction = createAction(
  ActionType.CREATE_ARTICLE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
