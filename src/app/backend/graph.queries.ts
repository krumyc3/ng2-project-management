import gql from 'graphql-tag';

export const QAllProjects = gql`
      query AllProjects {
        allProjects {
          id
          name
          description
          createdAt
        }
      }
    `;
export const QProjectTasks = gql`
  query projectTasks($projectId: ID!) {
    Project(id: $projectId) {
      id
      tasks {
        id
        title
        description
        due
      }
    }
  }`;

export const QProjectDetails = gql`
    query ProjectDetails($id: ID!) {
      Project(id: $id) {
        id
        name
        createdAt
        description
        tasks {
          id
          title
          description
          comments {
            id
            createdAt
            content
            likes
          }
        }
      }
    }
`;

export const QTaskComments = gql`
  query taskComments($taskId: ID!) {
    Task(id: $taskId) {
      id
      comments {
        id
        createdAt
        content
        likes
      }
    }
  }`;