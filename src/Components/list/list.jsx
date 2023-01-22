import ListItem from "../list-item/list-item";
import useList from "./use-list";
import "./list.css"


const List = ({initialState}) => {

    const {
        list,
        currentValue,
        handleChange,
        handleSubmit,
        handleDelete,
    } = useList(initialState)


    return (
        <ol className="listContent">
            {list.map((item, index) => (
                <ListItem
                    key={`list_item_${item.value}_${index}`}
                    list={list}
                    currentValue={currentValue}
                    value={item}
                    index={index}
                    onChange={handleChange.bind(this, index)}
                    onKeydown={event => handleSubmit(event, index)}
                    onDelete={() => handleDelete(index)}
                />)
            )}
        </ol>
    );
}

export default List;