import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // console.log(postData);
    // Send Http request. Don't need to unsubscribe. It will do it on its own
    this.http
      .post(
        // 'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
        'https://ng-complete-guide-76b2f-default-rtdb.firebaseio.com/post.json',

        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
      .get(
        'https://ng-complete-guide-76b2f-default-rtdb.firebaseio.com/post.json'
      )
      .subscribe((posts) => {
        console.log(posts);
      });
  }
}
