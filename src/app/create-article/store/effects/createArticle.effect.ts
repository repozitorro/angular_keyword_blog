import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CreateArticleService} from '../../createArticle.service';
import {Router} from '@angular/router';
import {createArticleAction, createArticleFailureAction, createArticleSuccessAction} from '../actions/createArticle.action';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class CreateArticleEffect {
  createArticle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleAction),
        switchMap(({article}) => {
          return this.createArticleService.createArticle(article).pipe(
            map((articleResponse: ArticleInterface) => {
              return createArticleSuccessAction({articleResponse});
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(createArticleFailureAction({errors: errorResponse.error.errors}));
            })
          );
        })
      )
  );

  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({articleResponse}) => {
          this.router.navigate(['/articles', articleResponse.slug]);
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router
  ) {
  }
}
