import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectFilter'
})
export class ProjectNameFilterPipe implements PipeTransform {
  transform(projects: any[], nameToFilter: string): any {
    if (nameToFilter !== '') {
      return projects.filter(project => {
        return project.name.toLowerCase().includes(nameToFilter.toLowerCase());
      });
    }
    return projects;
  }

}
