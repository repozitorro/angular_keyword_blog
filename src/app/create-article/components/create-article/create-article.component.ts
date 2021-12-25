import {Component, OnInit} from '@angular/core';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {Observable} from 'rxjs';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {select, Store} from '@ngrx/store';
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors';
import {createArticleAction} from '../../store/actions/createArticle.action';
import {ArticleRequestInterface} from '../../../shared/types/articleRequest.interface';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(articleInput: ArticleInputInterface) {
    const article = this.transformTagList(articleInput);
    this.store.dispatch(createArticleAction({article}));
  }

  transformTagList(articleInput): ArticleRequestInterface {
    return {
     article: {
       ...articleInput,
       tagList: articleInput.tagList.split(' ')
     }
    };
  }
}
