import React from 'react';

// UserProfile Properties 
interface UserProfileProps {
    id: string;
    email: string;
    picture: string | undefined;
    biography: string
}

interface UserProfileState {}

export class UserProfile extends React.Component<UserProfileProps, UserProfileState> {
    
    render() {
        console.log(this.props)
        return <div className="profile">
            {this._renderPicture()}
            <div className="profile-body">
                <h5 className="profile-email">{this.props.email}</h5>
                <p className="profile-biography">{this.props.biography}</p>
            </div>
        </div>;
    }
    // render Picture if not found
    private _renderPicture() {
        if (this.props.picture === undefined) {
            return <img src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png" 
            className="profile-picture" alt="picture"/>
        } else {
        return <img className="profile-picture" src={this.props.picture} alt="picture" />
        }
    }
}