import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import LogCache from 'apollo-cache-logger';
import { GET_AUTH_DATA } from './graphql';

const logCache = false;

const cache = logCache
  ? new LogCache(new InMemoryCache({ addTypename: false }), { logger: msg => console.log(msg) })
  : new InMemoryCache();

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const authLink = setContext((_, { headers, ...context }) => {
  const token = localStorage.getItem('token');
  const currentUserId = localStorage.getItem('currentUserId');

  return {
    ...context,
    headers: {
      ...headers,
      currentuserid: currentUserId ? currentUserId : '',
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

// this removes '__typename' from any request variables, in case they are obtained from a previous query.
const cleanTypeNameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
  }
  return forward(operation).map(data => {
    return data;
  });
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, cleanTypeNameLink, httpLink]),
  cache,
  resolvers: {
    Mutation: {
      logout: async (_, __, { client }) => {
        await localStorage.clear();
        await client.resetStore();
      }
    }
  }
});

cache.writeData({
  data: {
    AuthData: {
      __typename: 'AuthData',
      token: localStorage.getItem('token') || null,
      currentUserId: localStorage.getItem('currentUserId') || null
    }
  }
});

client.onResetStore(() =>
  client.writeQuery({
    query: GET_AUTH_DATA,
    data: {
      AuthData: {
        /* These have to check localStorage again, otherwise they're locked into the value for token / currentUserId
        that they were assigned when the cache was first instantiated. I.e. they don't reflect changes on logout. */
        __typename: 'AuthData',
        token: localStorage.getItem('token') || null,
        currentUserId: localStorage.getItem('currentUserId') || null
      }
    }
  })
);
