import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileInterface} from '../../../shared/types/profile.interface';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getUserProfileAction} from '../../store/actions/getUserProfile.action';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {errorSelector, isLoadingSelector, userProfileSelector} from '../../store/selectors';
import {currentUserSelector} from '../../../auth/store/selectors';
import {filter, map} from 'rxjs/operators';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  username: string;
  userProfile: ProfileInterface;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  apiUrl: string;
  isCurrentUserProfile$: Observable<boolean>;

  userProfileSub: Subscription;
  routeSub: Subscription;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    }
  }

  initializeValues(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.getApiUrl();
    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    ).pipe(map(([currentUser, userProfile]: [CurrentUserInterface, ProfileInterface]) => {
      return currentUser.username === userProfile.username;
    }));

    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.username = params.username;
      this.fetchData();
    });
  }

  initializeListeners(): void {
    this.userProfileSub = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile: ProfileInterface) => {
        this.userProfile = userProfile;
      });
  }

  fetchData(): void {
    this.store.dispatch(getUserProfileAction({username: this.username}));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return  this.apiUrl = isFavorites
      ? `/articles?favorited=${this.username}`
      : `/articles?author=${this.username}`;
  }
}
