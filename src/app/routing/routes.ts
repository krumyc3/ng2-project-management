import { Routes } from '@angular/router';
import { ProjectlistComponent } from '../components/domain/projectlist/projectlist.component';
import { SingleProjectViewComponent } from '../components/domain/single-project-view/single-project-view.component';
import { UserFormComponent } from '../components/interaction/user-form/user-form.component';
import { LoginGuard } from './login.guard';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: UserFormComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: UserFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'projects',
    component: ProjectlistComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
  {
    path: 'projects/:id',
    pathMatch: 'full',
    component: SingleProjectViewComponent,
  },
];
