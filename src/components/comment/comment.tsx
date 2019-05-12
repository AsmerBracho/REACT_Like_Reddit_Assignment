import React from 'react';

// Interface that containt Details to be rendered in link details page
export interface CommentDetails {
    id?: number;
    userId?: number;
    email?: string;
    content?: string;
    dateTime?: string;
}

interface CommentProps extends CommentDetails {
   
}

interface CommentState {

}
// Export theinterface so it can be used in the app
export class Comment extends React.Component<CommentProps, CommentState> {
    public render() {
        return (
            <table className="comment-details">
                <tbody>
                    <tr>
                        <td className="left">
                            <div className="vote-btn">↑</div>
                            <div className="vote-btn">↓</div>
                        </td>
                        <td className="right">
                            <div className="audit">{this.renderTimeSinceDate(this.props.dateTime as string)} ago by {this.props.email}</div>
                            <h2 className="content">{this.props.content}</h2>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
    
    private renderTimeSinceDate(jsonDate: string) {
        const time = Date.parse(jsonDate);
        const now = new Date().getTime();
        const difference = (now - time) / 1000;
        const seconds = Math.ceil(difference);
        const minutes = Math.ceil(seconds / 60);
        const hours = Math.ceil(minutes / 60);
        const days = Math.ceil(hours / 24);
        if (seconds < 60) {
            return `${seconds} seconds`;
        } else if (minutes < 60) {
            return `${minutes} minutes`;
        } else if (hours < 24) {
            return `${hours} hours`;
        } else {
            return `${days} days`;
        }
    }
}
