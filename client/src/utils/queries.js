import { gql } from '@apollo/client';

export const GET_ME= gql`
query me{
me {
    bookCount
    savedBooks {
      bookId
      description
      image
      link
      title
      authors
    }
  }
}`