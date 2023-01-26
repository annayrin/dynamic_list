import React, {useCallback, useMemo, useRef, useState} from "react";
import "./resizable-div.css"

const initialData = {
    initialTime: 70000,
    minTime: 10000,
    maxWidth: 800,
}

function ResizableDiv() {

    const divRef = useRef(null);

    const {initialTime, minTime, maxWidth} = initialData

    const [newWidth, setNewWidth] = useState(maxWidth);
    const [time, setTime] = useState(initialTime) // in milliseconds

    const [side, setSide] = useState(null)
    const [dragging, setDragging] = useState(false)

    const [x, setX] = useState(0);
    const [initialX, setInitialX] = useState(0);

    function millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return seconds === 60 ?
            (minutes + 1) + ":00" :
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds
    }

    const millis = useMemo(() =>
            millisToMinutesAndSeconds(time),
        [time])

    const changeSide = side => {
        setSide(side)
        setDragging(false)
    }

    const handleDragging = (boolean) => {
        setDragging(boolean)
    }
    const handleMouseDown = (event) => {
        event.preventDefault()
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = useCallback((event) => {
        if (dragging) { //it's not working correctly
            let currentX = initialX + (event.clientX - x)
            if (currentX > 0 && currentX <= maxWidth - newWidth) {
                setX(currentX);
            }

        } else { // sometimes it's working, sometimes nooot
            let rightWidth = event.clientX - divRef.current.offsetLeft
            let rightTime = initialTime * rightWidth / maxWidth
            let leftWidth = newWidth - (event.clientX - initialX)
            let leftTime = initialTime * leftWidth / maxWidth
            let currentX = initialX + (event.clientX - x)
            if (side === "right" && rightTime >= minTime && rightWidth <= maxWidth && event.clientX < maxWidth ) {
                setNewWidth(rightWidth);
                setTime(rightTime)

            }
            if (side === "left" && currentX > 0 && leftTime >= minTime && leftWidth <= maxWidth) {
                setInitialX(divRef.current.offsetLeft)
                setX(currentX);
                setNewWidth(leftWidth);
                setTime(leftTime)

            }
        }
    }, [side, newWidth, dragging, time])

    const handleMouseUp = () => {
        if (dragging) {
            setDragging(false)
        }
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div
            ref={divRef}
            className={"resizable"}
            data-time={millis}
            style={{
                width: `${newWidth}px`,
                left: `${x}px`,
            }}
        >
            <div className='resizer left'
                 onMouseDown={handleMouseDown}
                 onMouseOver={() => changeSide("left")}
            ></div>
            <div className="drager"
                 onMouseDown={handleMouseDown}
                 onMouseOver={() => handleDragging(true)}
                 onMouseLeave={() => handleDragging(false)}
            >
            </div>
            <div
                className='resizer right'
                onMouseOver={() => changeSide("right")}
                onMouseDown={handleMouseDown}
            > >
            </div>
        </div>
    );
}

export default ResizableDiv