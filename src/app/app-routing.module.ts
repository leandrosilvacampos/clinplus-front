import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MySchedulesComponent } from './components/my-schedules/my-schedules.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { breadcrumb: 'Página inicial' },
  },
  {
    path: 'my-schedules',
    component: MySchedulesComponent,
    data: { breadcrumb: 'Meus agendamentos' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
