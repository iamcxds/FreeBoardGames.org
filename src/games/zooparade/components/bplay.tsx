import React from 'react';

interface InnerWrapper {
    onPlay(): any;
    onTrash(): any;
    myTurn: boolean;
}

var play = require('./media/play.jpeg')
var trash = require('./media/trash.jpeg')

export class BPlay extends React.Component< InnerWrapper, { } > {
    render() {
        if (this.props.myTurn){
            return (
                <div>
                    <div onClick={this.props.onPlay}>
                        <img src={ play } height="50" width="50"></img>
                    </div>
                    
                    <div onClick={this.props.onTrash}>
                        <img src={ trash } height="50" width="50"></img>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div > waiting </div>
                |
                <div> waiting </div>
            </div>
        )
    }
}
