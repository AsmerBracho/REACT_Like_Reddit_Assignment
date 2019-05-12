import React from "react";
import * as joi from "joi";
import { async } from "q";
import * as H from "history";
import { setAuthToken, getAuthToken, withAuth } from "../components/with_auth/with_auth";
import { withRouter } from "react-router";
import { createBrowserHistory } from "history";

const linkSchema = {
    title: joi.string().required(),
    url: joi.string().min(8).uri().required()
};

interface CreateLinkProps {
    token: string | null;
    history: H.History;
}

interface CreateLinkPropoState {
    title: string,
    url: string,
    error: any,
    token: string | null;
}

// Internal Class that will be pass when exporting
class CreateLinkInternal extends React.Component<CreateLinkProps, CreateLinkPropoState> {

    constructor(props: CreateLinkProps) {
        super(props);
        this.state = {
            title: "",
            url: "",
            error: null,
            token: null
        };
    }

    // Component Will Mount
    public componentWillMount() {
        if (this.state.token === null) {
            this.setState({ token: getAuthToken() })
        }
    }

    // Render 
    public render() {
        if (this.props.token === null) {
            return <div className="error-msg">Access denied. You Must be Logged in</div>
        } else {
            return (
                <div className="create_link_container">
                    <h1>Title: </h1>
                    <input
                        className="input-text"
                        type="text"
                        placeholder="Title"
                        onKeyUp={(e) => this._updateTitle((e as any).target.value)}
                    />

                    <h1>Url: </h1>
                    <input
                        className="input-text"
                        type="text"
                        placeholder="Title"
                        onKeyUp={(e) => this._updateUrl((e as any).target.value)}
                    />

                    <button
                        onClick={() => this._createLink()}
                        className="btn3"
                    >
                        Create Link
                    </button>
                    {this._renderValidationErrors()}
                    {this._renderServerErrors()}
                </div>
            );
        }

    }

    // Update Title
    private _updateTitle(title: string) {
        this.setState({ title: title });
    }

    // Update Url
    private _updateUrl(url: string) {
        this.setState({ url: url });
    }

    // If there is any error 
    private _renderServerErrors = () => {
        if (this.state.error !== null) {
            return <div className="error-msg">
                {this.state.error.error.toString()}
            </div>;
        }
    }

    // Validate the data
    private _renderValidationErrors = () => {
        const validationResult = joi.validate({
            title: this.state.title,
            url: this.state.url
        }, linkSchema);
        if (validationResult.error) {
            return <div className="error-msg2">
                {validationResult.error.details.map((d, i) => <div key={i}>{d.message}</div>)}
            </div>;
        } else {
            return null;
        }
    };

    // Create a Link 
    private _createLink() {
        (async () => {
            try {
                const newLink = await PostNewLink(this.state.title, this.state.url, this.state.token)
                //reset error
                this.setState({ error: null })
                console.log("whatever");
                this.props.history.push("/link_details/" + newLink.id);
            } catch (err) {
                this.setState({ error: err.error })
                console.log(err);
            }
        })();
    }

}

// Client API call
async function PostNewLink(title: string, url: string, token: string | null) {
    const data = {
        title: title,
        url: url
    };
    if (token != null) {
        const response = await fetch(
            "/api/v1/links",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token
                },
                body: JSON.stringify(data)
            }
        );
        const json = await response.json();
        return json;
    }
}

export const CreateLink = withRouter(props => <CreateLinkInternal token={getAuthToken()} {...props} />);
