import React from 'react';
import "./wrapper.css"
import Column from "../column/column";

const initialState1 = [""]
const initialState2 = [""]
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
                    initialState={initialState1}
                />
                <Column
                    header={"Cons"}
                    initialState={initialState2}
                />

            </div>
        </section>
    );
}

export default Wrapper;