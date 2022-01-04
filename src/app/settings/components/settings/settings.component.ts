import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {Observable, Subscription} from 'rxjs';
import {currentUserSelector} from '../../../auth/store/selectors';
import {filter} from 'rxjs/operators';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors';
import {updateCurrentUserAction} from '../../../auth/store/actions/updateCurrentUser.action';
import {logoutAction} from '../../../auth/store/actions/sync.action';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser: CurrentUserInterface;
  currentUserSub: Subscription;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface>;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
  }


  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    if (this.currentUserSub) {
      this.currentUserSub.unsubscribe();
    }
  }

  initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  initializeListeners(): void {
    this.currentUserSub = this.store.pipe(select(currentUserSelector), filter(Boolean)).subscribe(
      (currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      }
    );
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: ''
    });
  }

  submit(): void {
    const currentUserInput: CurrentUserInterface = {
      ...this.currentUser,
      ...this.form.value
    };
    this.store.dispatch(updateCurrentUserAction({currentUserInput}));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
