import React from 'react';

interface ListviewProps {
    items: JSX.Element[];
}

interface ListviewState {
    // This is an stateless component 
}

export class Listview extends React.Component<ListviewProps, ListviewState> {
    public render() {
        if (this.props.items.length < 1) {
            // Incase of no Items show a message in te console 
            return <div>There are no items to show!</div>;
        } else {
            /** return a list view with specific style. This list view is an array of 
             *  JSX items that will be map to a list <li> 
            */
            return <ul className="list-view">
                {this.props.items.map(function (item, itemIndex) {
                    return <li key={itemIndex}>{item}</li>;
                })}
            </ul>;
        }
    }
}
