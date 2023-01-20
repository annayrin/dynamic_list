import React from 'react';
import "./list-item.css"

function ListItem({list, name, value, id, refer, index, onChange, onDelete, onKeydown}) {


    return (

        <li className="itemContent">
            <div className="listDiv">
                <input
                    id={id}
                    name={name}
                    type="text"
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeydown}
                    ref={refer}
                    maxLength={25}

                />
                {index !== list.length-1 && (
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