import React, {useEffect, useRef, useState} from "react";
import "./resizable-div.css"

const initialData = {
    initialTime: 70000,
    minTime: 10000,
    millisToMinutesAndSeconds: (millis) => {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return seconds === 60 ?
            (minutes + 1) + ":00" :
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    }
}


function ResizableDiv() {

    const divRef = useRef(null)

    const {initialTime, minTime, millisToMinutesAndSeconds} = initialData

    const [initialWidth, setInitialWidth] = useState(null)
    const [initialLeft, setInitialLeft] = useState(0) // left from viewport

    const [customWidth, setCustomWidth] = useState(null)
    const [customLeft, setCustomLeft] = useState(0)

    const [resizing, setResizing] = useState(false)
    const [side, setSide] = useState("")

    const [dragging, setDragging] = useState(false)

    const customStyle = {width: customWidth * 100 / initialWidth + "%", left: customLeft * 100 / initialWidth + "%"}

    const time = millisToMinutesAndSeconds(initialTime * customWidth / initialWidth)
    const minWidth = minTime * initialWidth / initialTime


    const handleMouseDown = (event, side) => {
        event.preventDefault()
        setSide(side)
        setResizing(true)
        setDragging(false)
    }

    const handleMouseMove = event => {

        if (resizing) {
            if (side === "right") {
                let width = customWidth - (customWidth - (event.clientX - initialLeft - customLeft))
                if (width <= initialWidth - customLeft
                    && width >= minWidth) {
                    setCustomWidth(width)
                }
            } else if (side === "left") {
                setCustomLeft(event.clientX - initialLeft  - 7) // can't get why the offsetLeft is 7 px less
                setCustomWidth(customWidth - (event.clientX - initialLeft - 7)) // !!!! not working




            } else {
                return null
            }
        } else if (dragging) {
            if (event.clientX - initialLeft - (customWidth / 2) >= 0
                && event.clientX - initialLeft - (customWidth / 2) + customWidth <= initialWidth) {
                setCustomLeft(event.clientX - initialLeft - (customWidth / 2)) // to keep the mouse in the middle
            }
        } else {
            return null
        }
    }


    const handleDrag = () => {
        setDragging(true)
        if (resizing) setResizing(false)
    }

    const handleMouseUp = () => {
        if (resizing) setResizing(false)
        if (side?.length) setSide("")
        if (dragging) setDragging(false)
    }


    useEffect(() => {
        setInitialWidth(divRef.current.offsetWidth) // to receive the initial width of the trimmer in px to calc the %
        setCustomWidth(divRef.current.offsetWidth)
        setInitialLeft(divRef.current.offsetParent.offsetLeft)  // distance from the left viewport of the div(trim holder not trimmer)
    }, [])

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
                    <div className='resizer left'
                         onMouseDown={(event) => handleMouseDown(event, "left")}
                    >
                    </div>
                    <div className="drag"
                         onMouseDown={handleDrag}
                         onMouseUp={() => setDragging(false)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M8.33 17.18a1.17 1.17 0 01-.25-1.25 1.14 1.14 0 011-.72h5.78a1.14 1.14 0 011 .72 1.17 1.17 0 01-.25 1.25l-2.88 3a1.09 1.09 0 01-1.58 0zm0-10.36l2.88-3a1.09 1.09 0 011.58 0l2.88 3a1.17 1.17 0 01.25 1.25 1.14 1.14 0 01-1 .72H9.11a1.14 1.14 0 01-1-.72 1.17 1.17 0 01.22-1.25z">
                            </path>
                        </svg>
                </div>
                <div className='resizer right'
                     onMouseDown={(event) => handleMouseDown(event, "right")}
                >
                </div>
            </div>
        </div>
</section>

)
    ;
}

export default ResizableDiv