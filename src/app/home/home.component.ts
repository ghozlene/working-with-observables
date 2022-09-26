import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, filter, map, Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private myObserv: Subscription;
  constructor() { }


  ngOnInit() {
    //this.myObserv = interval(1000).subscribe((count) => {
    //  console.log(count);
    //});
    const customIntervaleObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('count greater then 3'));
        }
        count++;
      }, 1000);
    });


    this.myObserv = customIntervaleObservable.pipe(filter((data: any) => {
      return data > 0;
    }), map((data) => {
      return 'round  ' + (data as number + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    },
      () => {
        console.log('completed');
      });
  }




  ngOnDestroy(): void {
    this.myObserv.unsubscribe();

  }
}
