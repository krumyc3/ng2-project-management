import { ProjectClientPipe } from './project-client.pipe';
import { Project } from './models/project';
import { Client } from './models/client';

fdescribe('ProjectClientPipe', () => {
  let pipe: ProjectClientPipe;
  let mockProjects: Project[] = [];
  const clientFullName = 'John Doe';
  const clientPartialName = 'hn';
  const clientNameInDifferentCase = 'dOe';
  beforeEach(() => {
    pipe = new ProjectClientPipe();
    mockProjects = [
      new Project('Neurosis', new Client('some id', 'Jane Doe'), 'some id', 'some description', null, [], [], new Date()),
      // tslint:disable-next-line:max-line-length
      new Project('Cult of Luna', new Client('some id', clientFullName), 'some other id', 'some other description', null, [], [], new Date())];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('correctly filters projects by client exact full name', () => {
    // const clientPartialNameToFilter = 'hn';
    // const clientNameInDifferentCase = 'dOe';
    // tslint:disable-next-line:max-line-length
    const expectedFilteredProjects = [new Project('Cult of Luna', new Client('some id', clientFullName), 'some other id', 'some other description', null, [], [], new Date())];
    expect(pipe.transform(mockProjects, clientFullName)).toEqual(expectedFilteredProjects);
    // expect(pipe.transform(mockProjects, clientPartialNameToFilter)).toEqual(expectedFilteredProjects);
    // expect(pipe.transform(mockProjects, clientNameInDifferentCase)).toEqual(expectedFilteredProjects);
  });

  it('does not filter by empty client name', () => {
    expect(pipe.transform(mockProjects, '')).toEqual(mockProjects);
  });
});
