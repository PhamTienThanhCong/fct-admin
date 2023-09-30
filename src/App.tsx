import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Topage from './modules/top/topPage';
import Login from './modules/auth/Login';

function App() {
  return (
    <Router>
      <Provider store={store}>
        {/* <Topage/> */}
        <Login/>
      </Provider>
    </Router>
  );
}

export default App;
