import gql from 'graphql-tag';

export const MCreateProject = gql`
  mutation createProject(
    $name: String!
    $description: String!
    $clientId: ID!
    $userId: ID!
  ) {
    createProject(
      name: $name,
      description: $description,
      clientId: $clientId
      authorId: $userId
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
    $userId: ID!
  ) {
    createProject(
      name: $name,
      description: $description,
      authorId: $userId
    ) {
      id
      name
      description
      createdAt
    }
  }
`;
export const MUpdateProject = gql`
  mutation updateProject($id: ID!, $name: String, $description: String, $clientId: ID!) {
    updateProject(
      id: $id,
      description: $description,
      name: $name,
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

export const MDeleteProject = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export const MAddTaskToProject = gql`
  mutation addTaskToProject($projectId: ID!, $taskName: String!, $taskDescription: String!, $taskDue: DateTime, $userId: ID!) {
    createTask(
      projectId: $projectId,
      title: $taskName,
      description: $taskDescription,
      due: $taskDue
      authorId: $userId
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
  mutation addClient($clientName: String!, $userId: ID!) {
    createClient(
      name: $clientName,
      authorId: $userId
    ) {
      id
      name
    }
  }
`;

export const MRegisterUser = gql`
  mutation SignupUser($email: String!, $password: String!) {
    signupUser(
      email: $email,
      password: $password
    ) {
      id
      token
    }
  }
`;

export const MLoginUser = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(
      email: $email,
      password: $password
    ) {
      id
      token
    }
  }
`;
