import {AuthStateInterface} from '../../auth/types/authState.interface';
import {FeedStateInterface} from '../modules/feed/types/feed-state.interface';
import {PopularTagsStateInterface} from '../modules/popular-tags/types/popularTagsState.interface';
import {ArticleStateInterface} from '../../article/types/articleState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagsStateInterface;
  article: ArticleStateInterface;
}
