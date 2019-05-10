import * as React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../with_auth/with_auth";

interface HeaderInternalProps {
    token: string | null;
}

interface HeaderInternalState {}

class HeaderInternal extends React.Component<HeaderInternalProps, HeaderInternalState> {
    public render() {
        return (
            <div className="top-navbar">
                <div className="container">
                
                <Link className="left" to="/">Links</Link>
                <img src="./data/logo.png" className="logo" alt="logo"/>
                    {this._renderLoginOrProfile()}
                </div>
            </div>
        );
    }

    
    private _renderLoginOrProfile() {
        if (this.props.token) {
            return <Link className="btn right" to="/profile">User Profile</Link>
        } else {
            return <React.Fragment>
                <Link className="btn2 right" to="/sign_up">Sign Up</Link>
                <Link className="btn right" to="/sign_in">Log In</Link>
            </React.Fragment>
        }
    }
    
}

export const Header = withAuth(props => <HeaderInternal token={props.authToken} />)

