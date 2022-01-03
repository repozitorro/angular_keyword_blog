import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';
import {ArticleInterface} from '../../shared/types/article.interface';

export class EditArticleStateInterface {
  isLoading: boolean;
  article: ArticleInterface | null;
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
