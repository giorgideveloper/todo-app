import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './App';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { BrowserRouter } from 'react-router-dom';

window.Pusher = Pusher;

window.Echo = new Echo({
	broadcaster: 'pusher',
	key: 'f85ba0ab4a82063a39ff',
	cluster: 'eu',
	forceTLS: true,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</BrowserRouter>
);
