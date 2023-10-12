import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnDestroy, OnInit {
  user: IUser | null = null;
  userSubscription!: Subscription;
  opened: boolean = true;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private _userService: UserService,
    private _router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.userSubscription = this._userService.user.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  get firstName(): string {
    if (!this.user) return '';

    const results = this.user.name.split(/\s+/);

    if (results) {
      return results[0];
    }

    return '';
  }

  logout() {
    this._userService.logout();
    this._router.navigate(['/login']);
  }
}
