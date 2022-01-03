import {createAction, props} from '@ngrx/store';
import {ActionType} from '../actionType';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {ArticleRequestInterface} from '../../../shared/types/articleRequest.interface';

export const updateArticleAction = createAction(
  ActionType.UPDATE_ARTICLE,
  props<{ slug: string; article: ArticleRequestInterface }>()
);

export const updateArticleSuccessAction = createAction(
  ActionType.UPDATE_ARTICLE_SUCCESS,
  props<{ articleResponse: ArticleInterface }>()
);

export const updateArticleFailureAction = createAction(
  ActionType.UPDATE_ARTICLE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
