import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import reducers from './reducers/index';
import {createStore,applyMiddleware,compose} from 'redux';
import './index.css';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';
const store=createStore(reducers,compose(applyMiddleware(thunk)));
ReactDOM.render(
<Provider store={store}>
<App/>
</Provider>
,document.getElementById('root'));

