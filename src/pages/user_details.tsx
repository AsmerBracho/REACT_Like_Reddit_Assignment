import * as React from "react";
import { Listview } from "../components/list_view/list_view";
import { withRouter } from "react-router";
import { getAuthToken } from "../components/with_auth/with_auth";
import { LinkEntry } from "../components/link_entry/link_entry";
import { LinkDetails } from "../pages/link_details";
import { Comment, CommentDetails } from "../components/comment/comment";
import { UserProfile } from "../components/user_profile/user_profile";

interface CommentInternal {
    id: number;
    userId: number;
    linkId: number;
    content: string;
}

interface Link {
    id: number;
    title: string;
    url: string;
    userId: number;
}

interface User {
    email: string;
    pic: string;
    bio: string;
    links: Link[];
    comments: Comment[];
}

interface ProfileProps {
    id: string | undefined;
}

interface ProfileState {
    user: null | User;
}

export class ProfileInternal extends React.Component<ProfileProps, ProfileState> {
    public constructor(props: ProfileProps) {
        super(props);
        this.state = {
            user: null
        };
    }

    public componentWillMount() {
        (async () => {
            if (this.props.id) {
                const user = await getUser(this.props.id);
                this.setState({ user: user });
            } else {
                const token = getAuthToken();
                if (token) {
                    console.log("token inside profile")
                    
                    const user = await getUserProfile(token);
                    this.setState({ user: user });
                    console.log(this.state.user)
                }
            }
        })();
    }

    public render() {
        if (this.state.user === null) {
            return <div>Loading...</div>;
        } else {
            console.log(this.state.user.email);
            return <div className="container-user">
                <div className="row-user">
                    <div className="inside">
                        <div>
                        <UserProfile
                                    email={this.state.user.email}
                                    biography={this.state.user.bio}
                                    picture={this.state.user.pic}
                                    id={this.props.id as string}
                                />
                        </div>

                        <Listview
                            items={
                                this.state.user.links.map((link, index) => {
                                    return <LinkEntry
                                        id={link.id}
                                        title={link.title}
                                        url={link.url}
                                    />
                                })
                            }
                        />
                        <Listview
                            items={
                                this.state.user.comments.map((comment, commentIndex) => {
                                    return (
                                        <div>
                                            <Comment
                                                key={commentIndex}
                                                {...comment}
                                                dateTime={(comment as any).dateTime}
                                                email={(() => {
                                                    if (this.state.user) {
                                                        return this.state.user.email
                                                    }
                                                    return "";
                                                })()}
                                            />
                                        </div>
                                    );
                                })
                            }
                        />

                    </div>
                </div>
            </div>

        }
    }

    
}

export const Profile = withRouter(props => <ProfileInternal id={props.match.params.id} />);

async function getUserProfile(token: string) {
    const reponse = await fetch(
        "/api/v1/auth/profile",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            }
        }
    );
    const json = await reponse.json();
    return json;
}

async function getUser(id: string) {
    const reponse = await fetch(
        `/api/v1/users/${id}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    const json = await reponse.json();
    return json;
}
