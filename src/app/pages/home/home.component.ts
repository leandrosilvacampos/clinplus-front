import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NewScheduleDialogComponent } from 'src/app/components/new-schedule-dialog/new-schedule-dialog.component';
import { IUser } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: IUser | null = null;
  userSubscription!: Subscription;

  constructor(public dialog: MatDialog, private _userService: UserService) {}

  ngOnInit(): void {
    this.userSubscription = this._userService.user.subscribe(
      (user) => (this.user = user)
    );
  }

  openDialog(): void {
    this.dialog.open(NewScheduleDialogComponent, {
      width: '700px',
    });
  }

  get firstName(): string {
    if (!this.user) return '';

    const results = this.user.name.split(/\s+/);

    if (results) {
      return results[0];
    }

    return '';
  }
}
