import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {RegisterComponent} from 'src/app/auth/components/register/register.component';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store/reducers';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {RegisterEffect} from './store/effects/register.effect';
import {EffectsModule} from '@ngrx/effects';
import {BackendErrorMessagesModule} from '../shared/modules/backendErrorMessages/backend-error-messages/backend-error-messages.module';
import {PersistenceService} from '../shared/services/persistence.service';
import {LoginEffect} from './store/effects/login.effect';
import { LoginComponent } from './components/login/login.component';

const routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect
    ]),
    BackendErrorMessagesModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
  ],
  providers: [
    AuthService,
    PersistenceService
  ]
})
export class AuthModule {
}
