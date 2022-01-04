import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './components/settings/settings.component';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store/reducers';
import {ReactiveFormsModule} from '@angular/forms';
import {BackendErrorMessagesModule} from '../shared/modules/backendErrorMessages/backend-error-messages/backend-error-messages.module';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', reducer),
    ReactiveFormsModule,
    BackendErrorMessagesModule
  ]
})
export class SettingsModule {
}
