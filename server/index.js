const express = require("express")
const {graphqlHTTP} = require("express-graphql")
const cors = require("cors")
const fs = require('fs')
const path = require('path')
const schema = require('./shcema')

let pages = []
fs.readFile(path.join(__dirname,'db.json'), (err, data) => {
    pages = JSON.parse(data)
})

const app = express()

const root = {
    getAllPages: () => {
        return pages
    },
    createPage: ({input}) => {
        const page = {
            id: Date.now(),
            name: input.name,
            pageType: input.pageType
        }
        pages.push(page)
        fs.writeFile("db.json", JSON.stringify(pages), (err) => {})
        return page
    },
    editPage: ({input}) => {
        let newPage
        let newPages = pages.map(page => {
            if (+page.id === +input.id) {
                newPage = {
                    ...page,
                    name: input.name
                }
                return {
                    ...page,
                    name: input.name
                }
            }
            return page
        })
        fs.writeFile("db.json", JSON.stringify(newPages), (err) => {})
        return newPages
    },
    deletePage: ({input}) => {
        pages = pages.filter(page => page.id != input.id)
        fs.writeFile("db.json", JSON.stringify(pages), (err) => {})
        return pages
    },
}

app.use(cors())
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
}))

app.listen(4000, () => {
    console.log("server has been started in port 4000");
})
