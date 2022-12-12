/** @format */

import React from 'react';
import { ApolloClient, ApolloLink, HttpLink, split } from 'apollo-boost';
import { ApolloProvider as Provider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { toast } from 'react-toastify';

import Jwt_Decode from 'jwt-decode';
import { onError } from 'apollo-link-error';
import store from './store';

let httpLink = new HttpLink({
	uri:
		//	'https://winciotserverdev.azurewebsites.net/graphql?code=BCAlOaxmSZP/pZYqkD5BDuAhQF7fbS2yvhYariRATMQ40aqhLkKW9w==',

		'https://wizpartnerbackend.azurewebsites.net/graphql',
});
const authLink = setContext((_, { headers }) => {
	let token = localStorage.getItem('JWT_Token');
	if (token) {
		//console.log(token);
		const jwt_Token_decoded = Jwt_Decode(localStorage.getItem('JWT_Token'));
		if (jwt_Token_decoded.exp * 1000 <= Date.now()) {
			localStorage.clear();
			store.dispatch({ type: 'LOGOUT' });
		} else {
			return {
				headers: {
					...headers,
					authorization: token ? token : '',
				},
			};
		}
	}
});

httpLink = authLink.concat(httpLink);

const wsLink = new WebSocketLink({
	uri: `wss://wizpartnerbackend.azurewebsites.net/graphql`,
	options: {
		reconnect: true,
		connectionParams: {
			Authorization: localStorage.getItem('JWT_Token'),
		},
	},
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	httpLink
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) => {
			toast.error(`${message}`, {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			// console.log(locations);
			// console.log(path);
			// console.log(message);
		});
	if (networkError) {
		// console.log(`[Network error]: ${networkError}`);
		toast.error(`${networkError}`, {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});
	}
});

const client = new ApolloClient({
	link: ApolloLink.from([errorLink, splitLink]),
	cache: new InMemoryCache(),
});

export default function ApolloProvider(props) {
	return <Provider client={client} {...props} />;
}
