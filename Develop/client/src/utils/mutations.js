import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
    mutation loginUser ($email: String!, $password: String!){
        loginUser(email:$email, password:$password){
            token
            user{
                _id
                username
            }

        }
    }
`;
export const ADD_USER = gql` 
    mutation addUser($username: String!, $email: String! $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }
`;
export const SAVE_BOOK = gql`
mutation saveBook($userId: ID!, $BookInput: {$authors: [String]!, $title: String!, $bookId:ID!, $image: String, $link: String})
{
    saveBook(userId: $userId, BookInput:$BookInput){
        _id
        username
        savedBooks
    }
}
`;
export const REMOVE_BOOK = gql`
mutation removeBook($BookInput: {$authors: [String]!, $title: String!, $bookId:ID!, $image: String, $link: String}){
    removeBook(BookInput:$BookInput){
        _id
        username
        savedBooks
    }
}
`