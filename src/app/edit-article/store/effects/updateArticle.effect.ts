import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EditArticleService} from '../../editArticle.service';
import {Router} from '@angular/router';
import {updateArticleAction, updateArticleFailureAction, updateArticleSuccessAction} from '../actions/updateArticle.action';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable()
export class UpdateArticleEffect {
  updateArticle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleAction),
        switchMap(({slug, article}) => {
          return this.editArticleService.updateArticle(slug, article).pipe(
            map((articleResponse: ArticleInterface) => {
              return updateArticleSuccessAction({articleResponse});
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                updateArticleFailureAction({errors: errorResponse.error.errors})
              );
            })
          );
        })
      )
  );

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({articleResponse}) => {
          this.router.navigate(['/articles', articleResponse.slug]);
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private editArticleService: EditArticleService,
    private router: Router
  ) {
  }
}
