import ListItem from "../list-item/list-item";
import useList from "./use-list";
import "./list.css"


const List = ({initialState}) => {

    const {
        list,
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
                    name={"listItem"}
                    id={"list_item"}
                    value={item.listItem}
                    index={index}
                    onChange={handleChange.bind(this, index)}
                    onKeydown={handleSubmit.bind(this)}
                    onDelete={handleDelete.bind(this,index)}
                    refer={e => item.itemRef = e}
                />)
            )}
        </ol>
    );
}

export default List;