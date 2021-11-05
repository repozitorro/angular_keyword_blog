import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleService as SharedArticleService} from '../shared/services/article.service';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {GetArticleEffect} from './store/effects/get-article.effect';
import {ArticleComponent} from './components/article/article.component';
import {RouterModule, Routes} from '@angular/router';
import {LoadingModule} from '../shared/modules/loading/loading.module';
import {ErrorMessageModule} from '../shared/modules/error-message/error-message.module';
import {TagListModule} from '../shared/modules/tag-list/tag-list.module';
import {ArticleService} from './services/article.service';
import {DeleteArticleEffect} from './store/effects/delete-article.effect';

const routes: Routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent
  }
];

@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('article', reducers),
    EffectsModule.forFeature([
      GetArticleEffect,
      DeleteArticleEffect
    ]),
    RouterModule.forChild(routes),
    LoadingModule,
    ErrorMessageModule,
    TagListModule
  ],
  providers: [
    ArticleService,
    SharedArticleService,
    GetArticleEffect
  ]
})
export class ArticleModule {
}
