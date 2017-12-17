import { Routes } from '@angular/router';
import { ProjectlistComponent } from '../components/domain/projectlist/projectlist.component';
import { SingleProjectViewComponent } from '../components/domain/single-project-view/single-project-view.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    component: ProjectlistComponent,
    pathMatch: 'full'
  },
  {
    path: 'projects/:id',
    pathMatch: 'full',
    component: SingleProjectViewComponent,
  },
];
