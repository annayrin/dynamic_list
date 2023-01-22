import React, {useEffect, useRef} from 'react';
import "./list-item.css"


function ListItem({list, value, index, currentValue, onChange, onDelete, onKeydown}) {

    const inputRef = useRef(null)

    useEffect(() => {
        if (+inputRef.current.name === currentValue[0]) {
            inputRef.current.focus()
        }
    }, [currentValue])


    return (

        <li className="itemContent">
            <div className="listDiv">
                <input
                    name={index}
                    type="text"
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeydown}
                    ref={inputRef}
                    maxLength={25}

                />
                {index !== list.length - 1 && (
                    <button
                        onClick={onDelete}
                        className="deleteButton"
                    >
                        x
                    </button>
                )}
            </div>
        </li>);
}

export default ListItem;