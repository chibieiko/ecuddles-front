import React from 'react';
import {render} from 'react-dom';
import App from './components/ui/App';

// todo remove later
window.React = React;

window.backendUrl = "http://localhost:8080";

render(
    <App />,
    document.getElementById('react-container')
);