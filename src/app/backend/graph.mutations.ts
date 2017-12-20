import gql from 'graphql-tag';

export const MCreateProject = gql`
  mutation createProject(
    $name: String!
    $description: String!
    $clientId: ID!
  ) {
    createProject(
      name: $name,
      description: $description,
      clientId: $clientId
    ) {
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

export const MCreateProjectWithoutClient = gql`
  mutation createProject(
    $name: String!
    $description: String!
  ) {
    createProject(
      name: $name,
      description: $description,
    ) {
      id
      name
      description
      createdAt
    }
  }
`;

export const MDeleteProject = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export const MAddTaskToProject = gql`
  mutation addTaskToProject($projectId: ID!, $taskName: String!, $taskDescription: String!, $taskDue: DateTime) {
    createTask(
      projectId: $projectId,
      title: $taskName,
      description: $taskDescription,
      due: $taskDue
    ) {
      project {
        id
      }
      id
      description
      due
      title
    }
  }
`;
export const MDeleteTask = gql`
  mutation deleteTask($taskId: ID!) {
    deleteTask(
      id: $taskId
    ) {
      id
      comments {
        id
      }
    }
  }
`;

export const MDeleteComment = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(
      id: $commentId
    ) {
        id
     }
  }
`;

export const MAddCommentToTask = gql`
  mutation addCommentToTask($taskId: ID!, $commentContent: String!) {
    createComment(
      taskId: $taskId,
      content: $commentContent,
      likes: 0
    ) {
      id
      task {
        id
      }
      content
      createdAt
    }
  }
`;

export const MLikeComment = gql`
  mutation likeComment($commentId: ID!, $likes: Int) {
    updateComment(id: $commentId, likes: $likes) {
      likes
      id
    }
  }
`;

export const MUpdateTaskStatus = gql`
  mutation updateTaskStatus($taskId: ID!, $newTaskStatus: String!) {
    updateTask(id: $taskId, status: $newTaskStatus) {
      id
      status
    }
  }
`;

export const MAddClient = gql`
  mutation addClient($clientName: String!) {
    createClient(
      name: $clientName
    ) {
      id
      name
    }
  }
`;
