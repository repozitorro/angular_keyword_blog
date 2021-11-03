import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PopularTagsService} from '../../services/popular-tags.service';
import {getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction} from '../actions/getPopularTags.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {PopularTagType} from '../../../../types/popularTag.type';
import {of} from 'rxjs';

@Injectable()
export class GetPopularTagsEffect {
  getPopularTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return getPopularTagsSuccessAction({popularTags});
          }),
          catchError(() => {
            return of(getPopularTagsFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ) {
  }
}
