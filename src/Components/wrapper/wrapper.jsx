import React from 'react';
import "./wrapper.css"
import Column from "../column/column";

function Wrapper({handleOpen}) {
    return (
        <section className="main-container">
            <div className="header">
                <h2>
                    Should I eat at Black Angus?
                </h2>
                <span className="closer" onClick={handleOpen}>
                    x
                </span>
            </div>
            <div className="content">
                <Column
                    header={"Pros"}
                />
                <Column
                    header={"Cons"}
                />

            </div>
        </section>
    );
}

export default Wrapper;