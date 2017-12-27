import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './models/project';

@Pipe({
  name: 'projectClient'
})
export class ProjectClientPipe implements PipeTransform {

  transform(projects: Project[], clientName: string) {
    if (clientName !== '') {
      return projects.filter(project => project.client.name.includes(clientName));
    } return projects;
  }

}
