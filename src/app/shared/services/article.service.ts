import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArticleResponseInterface} from '../types/articleResponse.interface';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {ArticleInterface} from '../types/article.interface';

@Injectable()
export class ArticleService {
  constructor(
    private http: HttpClient
  ) {
  }

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;

    return this.http.get<ArticleResponseInterface>(fullUrl).pipe(
      map((res: ArticleResponseInterface) => {
        return res.article;
      })
    );
  }
}

