import gql from 'graphql-tag';

export const QAllProjects = gql`
      query allProjects{
        allProjects{
          id
          name
          description
          createdAt
          client {
            id
            name
          }
          author {
            lastName
            firstName
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
      author {
        email
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
        author {
          lastName
          firstName
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
        author {
          email
        }
      }
    }
  }`;

export const QAllClients = gql`
  query allClients {
    allClients {
      id
      name
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

export const QUserInfo = gql`
  query userInfo($userId: ID!) {
    User(
      id: $userId
    ) {
      firstName
      lastName
      phone
      role
    }
  }`;
