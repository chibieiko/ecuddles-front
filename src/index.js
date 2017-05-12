import React from 'react';
import {render} from 'react-dom';
import App from './components/ui/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import './stylesheets/global.scss';

// todo remove later
window.React = React;
window.backendUrl = "http://localhost:8080";

render(
    <App />,
    document.getElementById('react-container')
);