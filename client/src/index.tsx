import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";

import './index.scss';
import App from './App';
import {setupStore} from "./redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);