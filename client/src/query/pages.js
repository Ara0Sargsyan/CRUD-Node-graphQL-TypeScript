import {gql} from "@apollo/client";


export const GET_ALL_PAGES = gql`
    
    query {
        getAllPages{
            id, name, pageType
        }
    }
    
`