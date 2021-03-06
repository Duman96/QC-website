import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-newspage',
  templateUrl: './newspage.component.html',
  styleUrls: ['./newspage.component.css']
})
export class NewspageComponent implements OnInit {

  public news;
  public list;

  constructor(private newsService: NewsService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.getList();
    // console.log(this.route.snapshot.params.id);
    this.route.params.subscribe((params) => {
      this.getNews(params.id);
  });
  }

  getNews(id) {
    this.newsService.item(id).subscribe(
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

  getList() {
    this.newsService.list().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.list = data;
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
