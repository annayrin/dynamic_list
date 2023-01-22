import {useState} from "react";


const useList = () => {

    const [list, setList] = useState([""])

    const [currentValue, setCurrentValue] = useState([list.length - 1])

    const handleChange = (index, event) => {
        const {value} = event.target;
        const initialList = [...list];
        initialList[index] = value;
        if (value.trim().length && !list[index + 1]) {
            initialList[index + 1] = ""
        }
        if (!value.trim().length) {
            initialList.splice(index, 1)
        }
        setList(initialList);

    }

    const handleDelete = index => {
        const initialList = [...list];
        initialList.splice(index, 1);
        setList(initialList);
    };


    const handleSubmit = (event, index) => {
        if (event.key === "Enter" && list[index]) {
            setCurrentValue([list.length - 1])
        }
    };

    return {
        list,
        currentValue,
        handleChange,
        handleSubmit,
        handleDelete,

    }

}

export default useList
