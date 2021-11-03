import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import {getCurrentUserFailureAction} from '../../../../../auth/store/actions/get-current-user.action';
import {GetFeedResponseInterface} from '../../types/get-feed-response.interface';
import {getFeedAction, getFeedSuccessAction} from '../actions/getFeed.action';
import {FeedService} from '../../services/feed.service';

@Injectable()
export class GetFeedEffect {

  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({url}) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccessAction({feed});
          }),

          catchError(() => {
            return of(getCurrentUserFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private feedService: FeedService
  ) {
  }
}
