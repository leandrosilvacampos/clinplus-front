import { Component, OnInit } from '@angular/core';
import { IScheduling } from 'src/app/core/interfaces/scheduling';
import { SchedulesHttpService } from 'src/app/services/schedules.service';

const ELEMENT_DATA = [
  {
    status: 'Agendado',
    date: '23/09/2023 08:00 - 09:00',
    company: 'Center clinica',
    procedure: 'Consulta',
  },
];

@Component({
  selector: 'app-my-schedules',
  templateUrl: './my-schedules.component.html',
  styleUrls: ['./my-schedules.component.scss'],
})
export class MySchedulesComponent implements OnInit {
  displayedColumns: string[] = ['status', 'date', 'company', 'procedure'];
  dataSource = ELEMENT_DATA;
  userSchedules: IScheduling[] = [];

  constructor(private _schedulesHttpService: SchedulesHttpService) {}

  ngOnInit(): void {
    this._schedulesHttpService.readUserSchedules().subscribe((schedules) => {
      console.log('schedules', schedules);

      this.userSchedules = schedules;
    });
  }
}
