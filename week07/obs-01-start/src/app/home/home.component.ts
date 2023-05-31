import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, interval, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'))
        }
        count++;
        // observer.error();
      }, 1000);
    });

    // this.firstObsSubscription = customIntervalObservable.pipe(
    //   map((data: number) => {
    //     return 'Round ' + (data + 1);
    //   })
    // );

    // this.firstObsSubscription = customIntervalObservable.subscribe((data) => {
    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      // data > 0 gives an error but it still works with no issues
      return data > 0;
    }), map((data: number) => {
      return 'Round ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
      // console.log('Round ' + (data + 1));
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
