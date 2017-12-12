import gql from 'graphql-tag';

const QAllProjects = gql`
      query AllProjects {
        allProjects {
          id
          name
          description
          createdAt
        }
      }
    `;
const QProjectDetails = gql`
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

export {
  QAllProjects, QProjectDetails
};

