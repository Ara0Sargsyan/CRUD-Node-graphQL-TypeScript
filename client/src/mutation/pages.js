import {gql} from "@apollo/client";



export const CREATE_PAGE = gql`
    mutation createPage ($input: createInput) {
        createPage(input: $input) {
            id, name, pageType
        }
    }
`

export const DELETE_PAGE = gql`
    mutation deletePage ($input: deleteInput) {
        deletePage(input: $input) {
            id
        }
    }
`

export const EDIT_PAGE = gql`
    mutation editPage ($input: editInput) {
        editPage(input: $input) {
            id, name, pageType
        }
    }
`