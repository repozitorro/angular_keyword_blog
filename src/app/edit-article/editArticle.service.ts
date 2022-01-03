import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArticleInterface} from '../shared/types/article.interface';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {SaveArticleResponseInterface} from '../shared/types/saveArticleResponse.interface';
import {map} from 'rxjs/operators';
import {ArticleRequestInterface} from '../shared/types/articleRequest.interface';

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {
  }

  updateArticle(slug: string, article: ArticleRequestInterface): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;

    return this.http.put<SaveArticleResponseInterface>(fullUrl, article)
      .pipe(map((res: SaveArticleResponseInterface) => res.article));
  }
}
