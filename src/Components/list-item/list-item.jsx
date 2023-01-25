import React from 'react';
import "./list-item.css"


function ListItem({list, value, index, refer, onChange, onDelete, onKeydown}) {

    return (

        <li className="itemContent">
            <div className="listDiv">
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeydown}
                    ref={refer}
                    maxLength={25}
                    autoFocus={index === 0}
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