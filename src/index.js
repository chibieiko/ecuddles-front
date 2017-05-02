import React from 'react';
import {render} from 'react-dom';
import App from './components/ui/App';

// todo remove later
window.React = React;

render(
    <App />,
    document.getElementById('react-container')
);