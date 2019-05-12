/**
 * CCT College Dublin 
 * Web Interaction Applications
 * React - Assiggment 
 * Author: Asmer Bracho 
 * Student-Number: 2016328 
 */

import React from 'react';
import { getAuthToken, withAuth } from "../with_auth/with_auth";
import * as H from "history";
import { Link } from 'react-router-dom';

// create Interfaces 

// Properties 
interface ComunityInfoProps {
    token: string | null;
}

interface ComunityInfoState {
    // users: string,
    count: string | null
    token: string | null;
}

export class ComunityInfoInternal extends React.Component<ComunityInfoProps, ComunityInfoState> {
    // we will use the constructor to set the initial state for links and query 
    public constructor(props: ComunityInfoProps) {
        super(props);
        this.state = {
            count: null,
            token: null
        };
    }

    public componentWillMount() {
        (async () => {
            // Get the token
            const token = getAuthToken();
            this.setState({ token: token });
            // get data from API
            const data = await getUserCount();
            console.log("data will mount");
            console.log(data);
            this.setState({ count: data.count });
        })();
    }

    // Render 
    public render() {
        if (this.state.count == null) {
            return <div>Loading...</div>;
        } else {
            return (
                <table className="comunity-details">
                    <tbody>
                        <tr>
                            <td className="left">
                                <img src="../data/comunity.jpg" className="comunity-logo" alt="comunity" />r/CCT
                            </td>
                            <td className="right">
                                <div className="comunity-right">{this.state.count} Users</div>
                                <div>
                                    {this._renderButton()}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    }

    private _renderButton() {
        if (this.props.token !== null) {
            return (
            <Link to="/create_link">
                <button
                    className="btn-comunity">
                    Create post
                </button>
            </Link>)
        } else {
            return null
        }
    }

}


async function getUserCount() {
    const response = await fetch("/api/v1/users/count");
    const json = await response.json();
    return json;
}

export const ComunityInfo = withAuth(props => <ComunityInfoInternal token={props.authToken} />);



