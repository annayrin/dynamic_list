import React from "react";
import "./resizable-div.css"
import useResizableDiv from "./use-resizable-div";

const initialData = {
    initialTime: 112580, // up to 3 min to not mess up the seconds
    minTime: 10000,

}

function ResizableDiv() {

    const {
        divRef,
        time,
        customStyle,
        start,
        end,
        secondsTrack,
        handleMouseUp,
        handleMouseMove,
        handleMouseDown,
        handleDrag,
    } = useResizableDiv(initialData)

    return (
        <section className="trim-content-wrapper"
                 onMouseUp={handleMouseUp}
        >
            <div className="trim-container"
                 onMouseMove={handleMouseMove}
            >
                <div
                    ref={divRef}
                    className={"resizable"}
                    data-time={time}
                    style={customStyle}
                >
                    <div className='resizer left '
                         data-start-second={start}
                         onMouseDown={(event) => handleMouseDown(event, "left")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M13.93 5.36a1.21 1.21 0 011.72 0 1.29 1.29 0 010 1.77L10.93 12l4.72 4.87a1.29 1.29 0 010 1.77 1.21 1.21 0 01-1.72 0l-5.57-5.75a1.28 1.28 0 010-1.78z"></path>
                        </svg>
                    </div>
                    <div className="drag"
                         onMouseDown={handleDrag}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M8.33 17.18a1.17 1.17 0 01-.25-1.25 1.14 1.14 0 011-.72h5.78a1.14 1.14 0 011 .72 1.17 1.17 0 01-.25 1.25l-2.88 3a1.09 1.09 0 01-1.58 0zm0-10.36l2.88-3a1.09 1.09 0 011.58 0l2.88 3a1.17 1.17 0 01.25 1.25 1.14 1.14 0 01-1 .72H9.11a1.14 1.14 0 01-1-.72 1.17 1.17 0 01.22-1.25z">
                            </path>
                        </svg>
                    </div>
                    <div className='resizer right'
                         data-end-second={end}

                         onMouseDown={(event) => handleMouseDown(event, "right")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M10.07 5.36a1.21 1.21 0 00-1.72 0 1.29 1.29 0 000 1.77L13.07 12l-4.72 4.87a1.29 1.29 0 000 1.77 1.21 1.21 0 001.72 0l5.57-5.75a1.28 1.28 0 000-1.78z"></path>
                        </svg>
                    </div>
                </div>
                <div className="seconds-counter">
                    {secondsTrack.map((item, i) => {
                        if (i % 5 === 0) {
                            return (<span
                                key={`second_${item}_${i}`}
                                data-second={item}
                                className="seconds note">
                        </span>)
                        } else {
                            return (<span
                                key={`second_${item}_${i}`}
                                className="seconds">
                        </span>)
                        }
                    })
                    }
                </div>
            </div>
        </section>

    );
}

export default ResizableDiv