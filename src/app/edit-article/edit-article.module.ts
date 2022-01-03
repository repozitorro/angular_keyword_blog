import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditArticleComponent} from './components/edit-article/edit-article.component';
import {EditArticleService} from './editArticle.service';
import {ArticleService as SharedArticleService} from '../shared/services/article.service';
import {RouterModule, Routes} from '@angular/router';
import {ArticleFormModule} from '../shared/modules/article-form/article-form.module';
import {EffectsModule} from '@ngrx/effects';
import {GetArticleEffect} from './store/effects/getArticle.effect';
import {UpdateArticleEffect} from './store/effects/updateArticle.effect';
import {StoreModule} from '@ngrx/store';
import {reducer} from './store/reducers';
import {LoadingModule} from '../shared/modules/loading/loading.module';

const routes: Routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent
  }
];

@NgModule({
  declarations: [
    EditArticleComponent
  ],
  imports: [
    LoadingModule,
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([GetArticleEffect, UpdateArticleEffect]),
    StoreModule.forFeature('editArticle', reducer)
  ],
  providers: [
    EditArticleService,
    SharedArticleService
  ]
})
export class EditArticleModule {
}
