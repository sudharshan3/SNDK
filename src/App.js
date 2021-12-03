import React, { Component } from 'react';
import Routes from './routes/Routes';

import './assets/scss/Saas.scss';


type AppProps = {};

class App extends Component<AppProps> {
    render() {
        return <Routes></Routes>;
    }
}

export default App;
