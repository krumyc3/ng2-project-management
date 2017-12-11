import gql from 'graphql-tag';

const QAllProjects = gql`
      query AllProjects {
        allProjects {
          id
          name
          description
        }
      }
    `;

export {
  QAllProjects
};

