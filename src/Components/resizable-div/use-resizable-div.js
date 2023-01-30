import React, {useEffect, useRef, useState} from 'react';

function UseResizableDiv(initialData) {

    const divRef = useRef(null)

    const {initialTime, minTime} = initialData

    const [initialWidth, setInitialWidth] = useState(null)
    const [initialLeft, setInitialLeft] = useState(0) // left from viewport

    const [customWidth, setCustomWidth] = useState(null)
    const [widthCopy, setWidthCopy] = useState(null) // for the left resizer
    const [customLeft, setCustomLeft] = useState(0)

    const [resizing, setResizing] = useState(false)
    const [side, setSide] = useState("")

    const [dragging, setDragging] = useState(false)

    function millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return seconds === 60 ?
            (minutes + 1) + ":00" :
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    }

    function getSecondsTracker(millis) {
        let arr = []
        for (let i = 0; i <= Math.round(millis / 1000); i++) {
            if (i < 60) {
                arr.push("00:" + (i < 10 ? "0" : "") + i)
            } else if (i % 60 === 0) {
                arr.push(Math.floor(i / 60) + ":00")
            } else if (i > 60) {
                arr.push(Math.floor(i / 60) + ":" + ((i - (Math.floor(i / 60) * 60)) < 10 ? "0" : "")
                    + ((i - (Math.floor(i / 60) * 60))))
            }
        }
        return arr;
    }

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

    return {
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
    }
}

export default UseResizableDiv;