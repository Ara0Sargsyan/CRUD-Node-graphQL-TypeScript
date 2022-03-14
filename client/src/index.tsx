import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);

