import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Context
import { DataContextProvider } from './context/dataContext';
import { StepContextProvider } from './context/stepContext';

// Components
import App from './App';

// CSS
import './predefined.css';
import './reset.css';
import './index.scss';

ReactDOM.render(
	<DataContextProvider>
		<StepContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StepContextProvider>
	</DataContextProvider>,
	document.getElementById('root')
);