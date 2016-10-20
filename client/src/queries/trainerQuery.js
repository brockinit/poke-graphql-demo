import gql from 'graphql-tag';

export const trainerQuery = gql`
  query {
  	trainers {
    	id
    	first_name
    	last_name
  	}
  }
`;
