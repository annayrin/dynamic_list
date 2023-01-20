import React from 'react';
import "./wrapper.css"
import Column from "../column/column";

const initialState1 = [{listItem: "", itemRef: null}]
const initialState2 = [{listItem: "", itemRef: null}]
function Wrapper({setOpen, open}) {
    return (
        <section className="main-container">
            <div className="header">
                <h2>
                    Should I eat at Black Angus?
                </h2>
                <span className="closer" onClick={setOpen.bind(this,!open)}>
                    x
                </span>
            </div>
            <div className="content">
                <Column
                    header={"Pros"}
                    initialState={initialState1}
                />
                <div className="line"></div>
                <Column
                    header={"Cons"}
                    initialState={initialState2}
                />

            </div>
        </section>
    );
}

export default Wrapper;