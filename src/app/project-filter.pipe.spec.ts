import { ProjectNameFilterPipe } from './project-filter.pipe';
import { Project } from './models/project';
import { Client } from './models/client';

describe('ProjectFilterPipe', () => {
  let pipe: ProjectNameFilterPipe;
  const mockProjects: Project[] = [];
  beforeEach(() => {
    pipe = new ProjectNameFilterPipe();
    mockProjects.push(
      new Project('Neurosis', new Client('some id', 'John Doe'), 'some id', 'some description', null, [], [], new Date()),
      new Project('Cult of Luna', new Client('some id', 'Jane Doe'), 'some other id', 'some other description', null, [], [], new Date())
    );
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('correctly filters given projects by name', () => {
    const nameToFilter = 'neurosis';
    const expectedFilteredProjects = mockProjects.filter(project => project.name !== nameToFilter);
    expect(pipe.transform(mockProjects, nameToFilter)).toEqual(expectedFilteredProjects);
  });
  it('does not filter project by empty name', () => {
    expect(pipe.transform(mockProjects, '')).toEqual(mockProjects);
  });
});
