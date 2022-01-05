import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserProfileService} from '../../userProfile.service';
import {getUserProfileAction, getUserProfileFailureAction, getUserProfileSuccessAction} from '../actions/getUserProfile.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class GetUserProfileEffect {
  getUserProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getUserProfileAction),
        switchMap(({username}) => {
          return this.userProfileService.getUserProfile(username).pipe(
            map((userProfile) => {
              return getUserProfileSuccessAction({userProfile});
            }),
            catchError(() => {
              return of(getUserProfileFailureAction());
            })
          );
        })
      )
  );

  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService
  ) {
  }
}
