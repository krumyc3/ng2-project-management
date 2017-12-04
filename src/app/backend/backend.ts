import { Injectable } from '@angular/core';


@Injectable()
export class Backend {
  getTasks(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
           {
            id: 0,
            projectId: 0,
            name: 'First task',
            description: 'First project first task',
          },
          {
            id: 0,
            projectId: 0,
            name: 'Second task',
            description: 'Second project second task',
          },
        ]);
      }, 1000);
    });
  }
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
    });
  }

  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => resolve(null));
  }
  getComments(): Promise<any> {
    return new Promise((resolve, reject) => resolve(null));
  }
}
