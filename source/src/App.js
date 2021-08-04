import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Blogs from './pages/Blogs';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/blogs">
            <Blogs />
          </Route>
          <Route path="/post/:id">
            <BlogDetail />
          </Route>
          <Route path="/search/:keyword">
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
