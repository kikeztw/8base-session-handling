import { gql } from '@apollo/client';

export const FETCH_USER_SESSION = gql`
  query FetchUserSession {
    user {
      id
      firstName
      lastName
      email
      gender
      userPhoTagUserRelation {
        id
        role
        active
      }
    }
  }
`;