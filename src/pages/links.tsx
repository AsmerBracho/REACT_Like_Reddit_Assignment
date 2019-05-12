/**
 * CCT College Dublin 
 * Web Interaction Applications
 * React - Assiggment 
 * Author: Asmer Bracho 
 * Student-Number: 2016328 
 */

import * as React from "react";
import { Listview } from "../components/list_view/list_view";
import { Link } from "react-router-dom";
import { LinkEntry, LinkPreviewEntry } from "../components/link_entry/link_entry";
import { ComunityInfo } from "../components/comunity_info/comunity_info";
import { getAuthToken } from "../components/with_auth/with_auth"

interface LinksProps {

}

interface LinksState {
    links: LinkPreviewEntry[] | null; // an array of links to be retrieved
    query: string; // the query for the search box
}

export class Links extends React.Component<LinksProps, LinksState> {
    // we will use the constructor to set the initial state for links and query 
    public constructor(props: LinksProps) {
        super(props);
        this.state = {
            links: null, // initial value is null
            query: "" // query is initially empty  
        };
    }

    public componentWillMount() {
        (async () => {
            const data = await getData();
            this.setState({ links: data });
        })();
    }

    public render() {
        console.log("just tendered")
        // While we are cathcing the data we do this 
        // that happens after componentWillMount
        if (this.state.links === null) {
            return <div>Loading...</div>;
        } else {
            // apply the filter 
            const filteredLinks = this.state.links.filter((link) => {
                return link.title.indexOf(this.state.query) !== -1;
            });

            return <div>
                {/*FILTER*/}
                <ComunityInfo/>
                <input
                    className="search"
                    placeholder="Search"
                    type="text"
                    onKeyUp={(e) => this._onSearch(e.currentTarget.value)}
                />
                {/*LIST VIEW OF CONTENTS*/}
                <Listview
                    items={filteredLinks.map((link, linkIndex) => {
                    return (
                        <LinkEntry
                            key={linkIndex}
                            {...link}
                            upVoting={(() => {
                                this._internalLetsVote(link.id, true)
                            })}
                            downVoting={(() => {
                                this._internalLetsVote(link.id, false)
                            })}
                        />);
                    })}
                    
                 />
            </div>
        }
    }

    private _internalLetsVote(id:number, isUp:boolean):void{
        (async () => {
            const voted = await letsVote(id, isUp)
            if(voted){
                const allLinks = getData()
                .then((data) => {
                    console.log("now")
                    this.setState({ links: data});
                });
            }
            
        })();
    }

    private _onSearch(query: string) {
        this.setState({ query: query });
    }
}

// Define method for voting 

export async function letsVote(id:number, isUp:boolean) {
    // get the token so we can check we are authenticated 
    const token = getAuthToken();
    // if token exits then perform the vote 
    if(token){
        const response = await fetch(
            `/api/v1/links/${id}/${isUp ? 'up' : 'down'}vote`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token
                }
            }
        );
        return await response.json();
    }
}

async function getData() {
    const response = await fetch("/api/v1/links/");
    const json = await response.json();
    return json as LinkPreviewEntry[];
}