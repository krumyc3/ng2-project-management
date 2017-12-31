import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './models/project';

@Pipe({
  name: 'projectClient'
})
export class ProjectClientPipe implements PipeTransform {

  transform(projects: Project[], clientId: string) {
    if (clientId === '' || clientId == null) return projects;
    else return projects.filter(project => {
      return project.client === null ? false : project.client.id.includes(clientId);
    });
  }
}
