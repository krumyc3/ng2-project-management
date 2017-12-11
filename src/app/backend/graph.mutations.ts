import gql from 'graphql-tag';

export const MCreateProject = gql`
  mutation createProject(
    $name: String!
    $description: String!
  ) {
    createProject(
      name: $name,
      description: $description
    ) {
      id
      name
      description
    }
  }
`;

export const MUpdateProject = gql`
  mutation updateProject($id: ID!, $name: String, $description: String) {
    updateProject(id: $id, name: $name, description: $description) {
      name
      description
      id
    }
  }
`;
