import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPaginator } from 'src/app/components/custom-paginator';
import { NewScheduleDialogComponent } from 'src/app/components/new-schedule-dialog/new-schedule-dialog.component';
import { IScheduling } from 'src/app/core/interfaces/scheduling';
import { SchedulesHttpService } from 'src/app/services/schedules.service';

interface ITableData {
  code: number | string;
  date: string;
  status: string;
  procedures: string[];
  company: string;
}

@Component({
  selector: 'app-my-schedules',
  templateUrl: './my-schedules.component.html',
  styleUrls: ['./my-schedules.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class MySchedulesComponent implements OnInit {
  displayedColumns: string[] = [
    'code',
    'status',
    'date',
    'company',
    'procedures',
    'actions',
  ];
  dataSource = new MatTableDataSource<ITableData>([]);
  tableData: ITableData[] = [];

  constructor(
    public dialog: MatDialog,
    private _schedulesHttpService: SchedulesHttpService
  ) {}

  ngOnInit(): void {
    this._schedulesHttpService
      .readUserSchedules()
      .subscribe((schedules: IScheduling[]) => {
        console.log('schedules', schedules);

        this.tableData = schedules.map((schedule) => {
          return {
            code: schedule.id,
            date: this._formatDate(schedule.startDate, schedule.endDate),
            status: schedule.status,
            procedures: schedule.procedures,
            company: schedule.company,
          };
        });

        this.dataSource = new MatTableDataSource(this.tableData);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    this.dialog.open(NewScheduleDialogComponent, {
      width: '700px',
    });
  }

  private _formatDate(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startHours = start.getHours();
    const startMinutes = start.getMinutes();
    const endHours = end.getHours();
    const endMinutes = end.getMinutes();

    const startHoursFormatted =
      startHours < 10 ? `0${startHours}` : `${startHours}`;
    const startMinutesFormatted =
      startMinutes < 10 ? `0${startMinutes}` : `${startMinutes}`;
    const endHoursFormatted = endHours < 10 ? `0${endHours}` : `${endHours}`;
    const endMinutesFormatted =
      endMinutes < 10 ? `0${endMinutes}` : `${endMinutes}`;

    return `${start.getDate()}/${start.getMonth()}/${start.getFullYear()} ${startHoursFormatted}:${startMinutesFormatted} - ${endHoursFormatted}:${endMinutesFormatted}`;
  }
}
