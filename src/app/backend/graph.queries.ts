import gql from 'graphql-tag';

export const QAllProjects = gql`
      query allProjects($user_id: ID!) {
        allProjects(
          filter: {
            author: {
              id: $user_id
            }
        }) {
          id
          name
          description
          createdAt
          client {
            id
            name
          }
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
        status
        due
      }
    }
  }`;

export const QProjectDetails = gql`
    query ProjectDetails($id: ID!, $userId: ID!) {
      Project(id: $id, filter: {
        author: {
          id: $userId
        }
      }) {
        id
        name
        createdAt
        description
        client {
          id
          name
        }
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

export const QAllClients = gql`
  query allClients {
    allClients {
      id
      name
      projects {
        id
      }
    }
  }
`;

export const QLoggedInUser = gql`
  query LoggedInUser {
    loggedInUser {
      id
      email
    }
  }
`;
