import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateArticleComponent} from './components/create-article/create-article.component';
import {RouterModule, Routes} from '@angular/router';
import {ArticleFormModule} from '../shared/modules/article-form/article-form.module';
import {CreateArticleService} from './createArticle.service';
import {EffectsModule} from '@ngrx/effects';
import {CreateArticleEffect} from './store/effects/createArticle.effect';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store/reducers';

const routes: Routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent
  }
];

@NgModule({
  declarations: [
    CreateArticleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([CreateArticleEffect]),
    StoreModule.forFeature('createArticle', reducer),
    ArticleFormModule
  ],
  providers: [
    CreateArticleService
  ]
})
export class CreateArticleModule {
}
