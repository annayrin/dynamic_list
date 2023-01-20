import React from 'react';
import List from "../list/list";
import "./column.css"

function Column({header, initialState}) {


    return (
        <div className="column">
            <div className="col-header">
                {header}
            </div>
            <div className="col-content">
                <List initialState={initialState}/>
            </div>
        </div>
    );
}

export default Column;