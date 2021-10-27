import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import {getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction} from '../actions/get-current-user.action';
import {PersistenceService} from '../../../shared/services/persistence.service';
import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';


@Injectable()
export class GetCurrentUserEffect {
  getCurrentUser = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistenceService.get('accessToken');

        if (!token) {
          return of(getCurrentUserFailureAction());
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return getCurrentUserSuccessAction({currentUser});
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
    private authService: AuthService,
    private persistenceService: PersistenceService,
  ) {
  }
}
