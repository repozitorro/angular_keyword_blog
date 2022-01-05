import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileService} from './userProfile.service';
import {EffectsModule} from '@ngrx/effects';
import {GetUserProfileEffect} from './store/effects/getUserProfile.effect';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store/reducers';
import {FeedModule} from '../shared/modules/feed/feed.module';

const routes: Routes = [
  {
    path: 'profiles/:username',
    component: UserProfileComponent
  },
  {
    path: 'profiles/:username/favorites',
    component: UserProfileComponent
  }
];

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile', reducer),
    FeedModule
  ],
  providers: [
    UserProfileService
  ]
})

export class UserProfileModule {
}
