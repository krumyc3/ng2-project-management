import { Injectable } from '@angular/core';


@Injectable()
export class Backend {
  getProjects(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 0,
            name: 'First project',
            description: 'First project description',
          },
          {
            id: 1,
            name: 'Second project',
            description: 'Second project description',
          },
        ]);
      }, 800);
    }).catch(error => Promise.reject(error));
  }
}
