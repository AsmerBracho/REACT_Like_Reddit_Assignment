/**
 * CCT College Dublin 
 * Web Interaction Applications
 * React - Assiggment 
 * Author: Asmer Bracho 
 * Student-Number: 2016328 
 */

import React from "react";
import "./index.css";
import { Switch, Route } from "react-router-dom";
import { Links } from "./pages/links";
import { Header } from "./components/header/header";
import { SignIn, SignUp } from "./pages/login";
import { Profile } from "./pages/user_details";
import { LinkDetails } from "./pages/link_details";
import { CreateLink } from "./pages/create_link";

const App: React.FC = () => {
  return (
    // Our application will be surronded by the Router Component 
        <div>
            <Header /> 
            <div className = "container">
                <Switch> 
                    <Route exact path="/" component={Links} />
                    <Route exact path="/sign_in" component={SignIn} />
                    <Route exact path="/sign_up" component={SignUp} />
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/profile/:id" component={Profile}/>
                    <Route exact path="/link_details/:id" component={LinkDetails}/>
                    <Route exact path="/create_link" component={CreateLink}/>

                </Switch>
            </div>>
    </div>
  );
};

export default App;