import React, {useEffect, useRef, useState} from "react";
import "./resizable-div.css"

const initialData = {
    initialTime: 30121,
    minTime: 10000,
    millisToMinutesAndSeconds: (millis) => {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return seconds === 60 ?
            (minutes + 1) + ":00" :
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    },
    getSecondsTracker: (seconds) => {
        let arr = []
        for (let i = 0; i <= Math.round(seconds / 1000); i++) {
            arr.push(i)

        }
        // if(Math.round(seconds / 1000) > arr[arr.length-1]) {
        //     arr.push(  Math.round(seconds / 1000))
        // }
        return arr;
    }
}

function ResizableDiv() {

    const divRef = useRef(null)

    const {initialTime, minTime, millisToMinutesAndSeconds, getSecondsTracker} = initialData

    const [initialWidth, setInitialWidth] = useState(null)
    const [initialLeft, setInitialLeft] = useState(0) // left from viewport

    const [customWidth, setCustomWidth] = useState(null)
    const [widthCopy, setWidthCopy] = useState(null) // for the left resizer
    const [customLeft, setCustomLeft] = useState(0)

    const [resizing, setResizing] = useState(false)
    const [side, setSide] = useState("")

    const [dragging, setDragging] = useState(false)

    const customStyle = {width: customWidth * 100 / initialWidth + "%", left: customLeft * 100 / initialWidth + "%"}

    const time = millisToMinutesAndSeconds(initialTime * customWidth / initialWidth)
    const start = millisToMinutesAndSeconds(customLeft * initialTime / initialWidth)
    const end = millisToMinutesAndSeconds((customWidth + customLeft) * initialTime / initialWidth)
    const minWidth = minTime * initialWidth / initialTime
    const secondsTrack = getSecondsTracker(initialTime)


    const handleMouseDown = (event, side) => {
        event.preventDefault()
        setSide(side)
        setResizing(true)
        if (dragging) setDragging(false)
    }

    const handleMouseMove = event => {
        if (resizing) {
            if (side === "right") {
                let width = customWidth - (customWidth - (event.clientX - initialLeft - customLeft))
                if (width <= initialWidth - customLeft
                    && width >= minWidth) {
                    setCustomWidth(width)
                    setWidthCopy(width)
                }
            } else if (side === "left") {
                let width = (widthCopy ? widthCopy : initialWidth) - (event.clientX - initialLeft - 10)
                if (width >= minWidth && event.clientX - initialLeft - 10 >= 0) {
                    setCustomLeft(event.clientX - initialLeft - 10) // reducing for 10px to let the event.target on the resizer
                    setCustomWidth(width)
                }
            }
        } else if (dragging) {
            if (event.clientX - initialLeft - (customWidth / 2) >= 0
                && event.clientX - initialLeft - (customWidth / 2) + customWidth <= initialWidth) {
                setCustomLeft(event.clientX - initialLeft - (customWidth / 2)) // to keep the mouse in the middle
            }
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
                                className="seconds"> {item}s
                        </span>)
                        } else {
                            return (<span
                                key={`second_${item}_${i}`}
                                className="seconds note">
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