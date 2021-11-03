import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.scss']
})
export class TagFeedComponent implements OnInit, OnDestroy {
  tagName: string;
  apiUrl: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params.slug;
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }

  ngOnDestroy(): void {
  }
}
