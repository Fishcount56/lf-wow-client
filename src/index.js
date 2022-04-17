import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app'
import { UserContextProvider } from "../src/context/userContext"
import { QueryClient, QueryClientProvider } from "react-query";

import { BrowserRouter as Router } from "react-router-dom";

const client = new QueryClient();

ReactDOM.render(
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
