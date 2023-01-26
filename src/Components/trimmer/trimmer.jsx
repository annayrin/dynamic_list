import React from 'react';
import ResizableDiv from "../resizable-div/resizable-div";
import "./trimmer.css"

function Trimmer({handleOpen}) {
    return (
        <section className="trim-wrapper">
            <span className="trim-closer" onClick={handleOpen}>x</span>
            <div className="trim-container" >
                <ResizableDiv />
            </div>
        </section>

    );
}

export default Trimmer;