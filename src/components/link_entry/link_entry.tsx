import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp, faChevronCircleDown} from '@fortawesome/free-solid-svg-icons';

// Interface linkEntry that contains all the golbal variables used to render the component 
export interface LinkPreviewEntry {
    id: number; // ID of the link 
    userId?: number; // User whose link belong to. Optional Property 
    email?: string | undefined; // user email this property is opcional 
    title: string; // link title 
    url: string; // url that redirect to the link site 
    dateTime?: string | null;
    commentCount?: number | null; // number of comments for the link 
    voteCount?: number | null; // number of votes for the link 
}

// This interface will be use to render a resumed version of the link entry Component 
export interface LinkPreviewEntryResumed {
    id: number; 
    title: string; 
    url: string; 
}

interface LinkEntryProps extends LinkPreviewEntry {
    upVoting?: any;
    downVoting?: any;
}

interface LinkEntryState {
    
}

// Render the class 
export class LinkEntry extends React.Component<LinkEntryProps, LinkEntryState> {
    public render() {
        return (
            <table className="link-details">
                <tbody>
                    <tr>
                        { /*define the left container of the view*/} 
                        <td className="left">
                            {/* <div className="vote-btn" onClick={this.props.upVoting}>↑</div> */}
                            <div className="vote-btn" onClick={this.props.upVoting}>
                            <FontAwesomeIcon icon= {faChevronCircleUp} size= "lg"/>
                            </div>
                            <div>{this.props.voteCount ? this.props.voteCount : 0}</div>
                            <div className="vote-btn" onClick={this.props.downVoting}>
                            <FontAwesomeIcon icon={faChevronCircleDown} size= "lg"
                            />
                            </div>
                        </td>

                        {/* Right container of the view */}
                        <td className="right">
                            {/* <div className="audit">{this._renderTimeSinceDate(this.props.dateTime as string)} ago by {this.props.email}</div>
                                <Link to={`/link_details/${this.props.id}`}>
                                <h2 className="title">{this.props.title}</h2>
                                </Link>
                            <a href={this.props.url}>{this.props.url}</a>
                            
                            <div className="comment-count">{this.props.commentCount} Comments</div> */}
                            {this._renderLinks()}
                        </td>
                    </tr>
                </tbody>
            </table>
        );    
    }

    // Render Links will render eather a full link component or reduced one 
    private _renderLinks() {
        if (this.props.email === undefined) {
            return (
                <div>
                    <Link to={`/link_details/${this.props.id}`}>
                    <h2 className="title">{this.props.title}</h2>
                    </Link>
                    <a href={this.props.url}>{this.props.url}</a>
                </div>     
            )
        }
        return (
            <div>
                <div className="audit">{_renderTimeSinceDate(this.props.dateTime as string)} ago by {this.props.email}</div>
                <Link to={`/link_details/${this.props.id}`}>
                    <h2 className="title">{this.props.title}</h2>
                    </Link>
                    <a href={this.props.url}>{this.props.url}</a>
                    
                <div className="comment-count">{this.props.commentCount} Comments</div>
            </div>     

        )
    }    
}

// This method will calculate the difference in date between the posted 
// date till now and use the info to display in the link component
// Method Provided by Remos Jansen in CCT lectures
// It takes as parameter JSON date of type string that look like "2019-05-01 01:00:18.579 " 
function _renderTimeSinceDate(jsonDate: string) {
    
    const time = Date.parse(jsonDate); // parse the dateto time stamp 
    const now = new Date().getTime(); // get the current time 
    const difference = (now - time) / 1000; // get the difference betwwen times
    const seconds = Math.ceil(difference); // get the seccond that the difference represents
    const minutes = Math.ceil(seconds / 60); // minutes 
    const hours = Math.ceil(minutes / 60); // hours 
    const days = Math.ceil(hours / 24); // days 
    
    // finally we return the corresponding value 
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