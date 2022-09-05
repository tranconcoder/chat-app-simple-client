import './assets/scss/fonts.scss';
import './assets/scss/global.scss';
import './assets/scss/reset.scss';
import './assets/scss/variables.scss';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

reportWebVitals();
