import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public news;

  constructor(private newsService: NewsService, private userService: UserService) { }

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.newsService.list().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.news = data;
        // convert the dates to a nice format
        // for (let news of this.news) {
        //   news.date = new Date(news.date);
        // }
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading posts')
    );
  }

}
