import * as React from "react";
import * as H from "history";
import { LinkEntry as LinkEntryComponent } from "../components/link_entry/link_entry";
import { withRouter } from "react-router";
import { Comment, CommentDetails } from "../components/comment/comment";
import { Listview } from "../components/list_view/list_view";
import { getAuthToken } from "../components/with_auth/with_auth"
import { ComunityInfo } from "../components/comunity_info/comunity_info";
import {letsVote} from "./links";

interface LinkData {
    id: number;
    userId: number;
    email: string;
    title: string;
    url: string;
    dateTime: string;
    commentCount: number | null;
    voteCount: number | null;
    comments: CommentDetails[]
}

interface LinkDetailsProps {
    id: number;
    history: H.History; 
}

interface LinkDetailsState {
    link: LinkData | null;
    newCommentContent: string
}

export class LinkDetailsInternal extends React.Component<LinkDetailsProps, LinkDetailsState> {
    public constructor(props: LinkDetailsProps) {
        super(props);
        this.state = {
            link: null,
            newCommentContent: ""
        };
    }
    public componentWillMount() {
        console.log("will mount link details");
        (async () => {
            const data = await getData(this.props.id);
            this.setState({ link: data });
        })();
    }
    public render() {
        if (this.state.link === null) {
            return <div>Loading...</div>;
        } else {
            return <div >
                <ComunityInfo/>
                <LinkEntryComponent {...this.state.link} 
                upVoting={() =>{
                    this._vote(true)
                }}
                downVoting={() =>{
                    this._vote(false)
                }}/>
                <Listview
                    items={
                        this.state.link.comments.map((comment, commentIndex) => {
                            return (
                                <Comment key={commentIndex} {...comment} />
                            );
                        })
                    }
                />
                {this._renderCommentEditor()}
            </div>;
        }
    }
    private _renderCommentEditor() {
        const token = getAuthToken();
        if (token) {
            return (
                <React.Fragment>
                    <div>
                        <textarea
                            className="input-text-comment"
                            placeholder="Write your comment here"
                            value={this.state.newCommentContent}
                            onChange={(e) => this.setState({ newCommentContent: e.currentTarget.value })}
                        ></textarea>
                    </div>
                    <div>
                        <button
                            onClick={() => this._handleCreateComment()}
                            className="btn-comment">
                            Submit
                        </button>
                    </div>
                </React.Fragment>
            );
        } else {
            return <div className="comment-login-first-msg">
                    Please Sign In if you wish to write a comment...</div>;
        }
    }
    
    // Vote
    private _vote = (whatIs:boolean):void => {
        console.log("Vote"); 
        (async () => {
            const data = await letsVote(this.props.id, whatIs);
            if(data){
                const voted = await getData(this.props.id);
                this.setState({ link: voted });
            }
        })();
    };


    // This method will be call only if user is login 
    private _handleCreateComment() {
        (async () => {
            try {
                const token = getAuthToken();
                if (token && this.state.link) {
                    await createComment(
                        this.state.link.id,
                        this.state.newCommentContent,
                        token
                    );
                    this.props.history.push("/");
                }
            } catch (err) {

            }
        })();
    }
}

export const LinkDetails = withRouter(props => <LinkDetailsInternal id={props.match.params.id} {...props} />)

async function getData(id: number) {
    const response = await fetch(`/api/v1/links/${id}`);
    const json = await response.json();
    return json as LinkData;
}

async function createComment(linkId: number, content: string, jwt: string) {
    const update = {
        linkId: linkId,
        content: content
    };
    const response = await fetch(
        "/api/v1/comments",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": jwt
            },
            body: JSON.stringify(update)
        }
    );
    const json = await response.json();
    return json;
}
