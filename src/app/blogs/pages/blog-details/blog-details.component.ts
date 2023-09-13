import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blog, Image, ImageListResponse } from 'src/app/home/models/blog.model';
import { BlogsService } from 'src/app/home/services/blog.service';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../../shared/utils/meta.utils';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  @Input() blog: Blog;
  images: Image[];
  subscriptions: Subscription[] = [];
  otherAlt: string;

  // get urlMetaData(): UrlMetaData {
  //   return this.route.snapshot.data.preFetchData.urlMetaData;
  // }

  constructor(
    private blogService: BlogsService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    const blogSlug = this.route.snapshot.paramMap.get('slug');
    if (!this.blog) {
      this.getBlog(blogSlug);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  changeTitle(blog: Blog) {
    if (blog) {
      setMetaTitle(
        `${blog.title
          .replace(/'/g, '')
          .replace(/"/g, '')} | Blogs | More Sneakers`,
        this.metaService,
        this.titleService
      );
    }
  }

  getBlog(blogSlug: string) {
    const sub = this.blogService
      .getBlogBySlug(blogSlug)
      .pipe(
        map(response => {
          this.blog = response.data;
          this.changeTitle(this.blog);
          this.addMetadata(this.blog);
          this.getImages(this.blog.id);
          this.otherAlt = `${this.blog.title
            .replace(/'/g, '')
            .replace(/"/g, '')}`;
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  addMetadata(blog: Blog) {
    setMetaKeywords(blog?.keywords ?? '', this.metaService);
    setMetaDescription(
      blog?.meta_description ??
        `Articles, reviews & focus sharing our own views of the sneaker game.`,
      this.metaService
    );

    this.metaService.updateTag({
      property: 'og:image',
      content: blog?.imgUrl ?? '',
    });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'https://moresneakers.com',
    });
  }

  getImages(blogId) {
    const sub = this.blogService
      .getBlogAllImages(blogId)
      .pipe(
        map((response: ImageListResponse) => {
          this.images = response.data.sort((a, b) => {
            if (a.position > b.position) {
              return 1;
            }
            if (a.position < b.position) {
              return -1;
            }
            return 0;
          });
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }
}
