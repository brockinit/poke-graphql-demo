import gql from 'graphql-tag';

export const trainerQuery = gql`
  query trainerQuery($firstName: String) {
  	id
  	first_name
  	last_name
  }
`;
