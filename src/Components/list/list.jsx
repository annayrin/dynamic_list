import ListItem from "../list-item/list-item";
import useList from "./use-list";
import "./list.css"


const List = () => {

    const {
        list,
        inputRef,
        handleChange,
        handleSubmit,
        handleDelete,
    } = useList()


    return (
        <ol className="listContent">
            {list.map((item, index) => (
                <ListItem
                    key={`list_item_${item.value}_${index}`}
                    refer={index === list.length-1 ? inputRef : null}
                    list={list}
                    value={item}
                    index={index}
                    onChange={(event) => handleChange(event, index)}
                    onKeydown={event => handleSubmit(event, index)}
                    onDelete={() => handleDelete(index)}
                />)
            )}
        </ol>
    );
}

export default List;