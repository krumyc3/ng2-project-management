import gql from 'graphql-tag';

const QAllProjects = gql`
      query AllProjects {
        allProjects {
          title
          description
        }
      }
    `;

export {
  QAllProjects
};

