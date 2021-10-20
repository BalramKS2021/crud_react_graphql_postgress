import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import EditUser from './editUser';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "http://localhost:8050/"
});

ReactDOM.render(<ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/edit/:id' component={EditUser} />
      </div>
    </Router>
  </ApolloProvider>, document.getElementById('root'));