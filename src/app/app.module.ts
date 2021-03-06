import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from 'src/app/auth/auth.module';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TopBarModule} from './shared/modules/topBar/top-bar.module';
import {PersistenceService} from './shared/services/persistence.service';
import {AuthInterceptor} from './shared/services/auth-interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {GlobalFeedModule} from './global-feed/global-feed.module';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {YourFeedModule} from './your-feed/your-feed.module';
import {TagFeedModule} from './tag-feed/tag-feed.module';
import {ArticleModule} from './article/article.module';
import {CreateArticleModule} from './create-article/create-article.module';
import {EditArticleModule} from './edit-article/edit-article.module';
import {SettingsModule} from './settings/settings.module';
import {UserProfileModule} from './user-profile/user-profile.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    EditArticleModule,
    ArticleModule,
    SettingsModule,
    UserProfileModule,
    StoreModule.forRoot({router: routerReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    PersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
