const {buildSchema} = require("graphql")

const schema = buildSchema(`
    type Page {
        id: ID
        name: String
        pageType: String
    }
    
    type Query {
        getAllPages: [Page]
    }
    
    input createInput {
        name: String
        pageType: String
    }
    
    input editInput {
        name: String
        id: ID
    }
    
    input deleteInput {
        id: ID
    }
    
    type Mutation {
        createPage(input: createInput): Page
        editPage(input: editInput): [Page]
        deletePage(input: deleteInput): [Page]
    }
`)

module.exports = schema