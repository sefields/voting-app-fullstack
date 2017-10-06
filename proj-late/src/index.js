import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import unregisterServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

unregisterServiceWorker();

//  Currently not using service workers (see './registerServiceWorker' default export)
//  Info: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#opting-out-of-caching