import {useRef, useState} from "react";


const useList = () => {

    const inputRef = useRef(null)

    const [list, setList] = useState([""])

    const handleChange = (event, index) => {
        const {value} = event.target;
        if (value.trim().length) {
            if (!list[index + 1]) {
                setList(prevState => [
                    ...prevState.slice(0, index),
                    value, ""
                ])
            } else {
                setList(prevState => [
                    ...prevState.slice(0, index),
                    value,
                    ...prevState.slice(index + 1)
                ])
            }
        } else {
            handleDelete(index)
        }

    }

    const handleDelete = index => {
        setList(prevState => [
            ...prevState.slice(0, index),
            ...prevState.slice(index + 1)
        ])
    };
    const handleSubmit = (event, index) => {
        if (event.key === "Enter" && list[index]) {
            inputRef.current.focus()
        }
    };

    return {
        list,
        inputRef,
        handleChange,
        handleSubmit,
        handleDelete,

    }

}

export default useList
