import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private activatedSub: Subscription;
  constructor(private useService: UserService) { }



  ngOnInit(): void {
    this.activatedSub = this.useService.activatedEmitter.subscribe(activate => {
      this.userActivated = activate;
    });
  }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }

}
