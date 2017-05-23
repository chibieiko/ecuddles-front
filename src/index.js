import React from 'react';
import {render} from 'react-dom';
import App from './components/ui/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import './stylesheets/global.scss';

window.React = React;

render(
    <App />,
    document.getElementById('react-container')
);