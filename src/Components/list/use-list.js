import {useCallback, useEffect, useLayoutEffect, useState} from "react";


const useList = () => {

    const [list, setList] = useState([{listItem: "", itemRef: null}]);
    const [currentValue, setCurrentValue] = useState({index: null, value: ""})


    const handleChange = (index, event) => {
        const {name, value} = event.target;
        setCurrentValue({index, value})
        const initialList = [...list];
        initialList[index][name] = value;
        setList(initialList);
    }

    const handleDelete = (index) => {
        const initialList = [...list];
        initialList.splice(index, 1);
        setList(initialList);
    };


    const handleSubmit = useCallback(event => {
        const last = list[list.length - 1]
        if (event.key === "Enter" && currentValue.value.trim().length) {
                last.itemRef.focus();
        }

    }, [list, currentValue]);

    useEffect(() => {
        if (list[list.length - 1].itemRef)
            list[list.length - 1].itemRef.focus();
    }, []);


    useEffect(() => {
        const initialList = [...list];
        if (!currentValue.value && initialList.length !== 1) {
            handleDelete(currentValue.index)
        }
    }, [currentValue])

    useEffect(() => {
        const initialList = [...list];
        const last = initialList[initialList.length - 1]
        if (currentValue.value.trim().length > 0 && last.listItem) {
            setList([...list, {listItem: "", itemRef: null}])
        }

    }, [list, currentValue])

    return {
        list,
        handleChange,
        handleSubmit,
        handleDelete,

    }

}

export default useList
