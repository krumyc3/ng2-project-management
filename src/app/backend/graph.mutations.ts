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
      author {
        email
        firstName
        lastName
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
      author {
        email
        lastName
        firstName
      }
    }
  }
`;
export const MUpdateProject = gql`
  mutation updateProject($id: ID!, $userId: ID!, $name: String, $description: String, $clientId: ID!) {
    updateProject(
      id: $id,
      description: $description,
      name: $name,
      clientId: $clientId
      authorId: $userId
    ) {
      id
      name
      description
      createdAt
      author {
        id
        firstName
        lastName
      }
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
      author {
        id
        email
        firstName
        lastName
      }
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
  mutation addCommentToTask($taskId: ID!, $commentContent: String!, $userId: ID!) {
    createComment(
      taskId: $taskId,
      content: $commentContent,
      likes: 0,
      authorId: $userId
    ) {
      id
      task {
        id
      }
      content
      createdAt
      author {
        id
        firstName
        lastName
      }
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
  mutation SignupUser($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
    signupUser(
      email: $email,
      firstName: $firstName,
      lastName: $lastName,
      password: $password
    ) {
      id
      firstName
      lastName
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

export const MUpdateUserInfo = gql`
  mutation updateUser(
    $userId: ID!,
    $firstName: String,
    $lastName: String,
    $phone: String
  ) {
    updateUser(
      id: $userId,
      firstName: $firstName,
      lastName: $lastName,
      phone: $phone
    ) {
      id
      firstName
      lastName
      phone
    }
  }
`;
