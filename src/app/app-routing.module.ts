import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MySchedulesComponent } from './pages/my-schedules/my-schedules.component';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
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
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
