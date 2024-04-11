import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const graphQL_Endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;

const client = new ApolloClient({
    uri: graphQL_Endpoint,
    cache: new InMemoryCache()
});


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(<ApolloProvider client={client}>
    <App />
</ApolloProvider>,);
