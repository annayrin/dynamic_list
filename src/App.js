import "./App.css";
import Wrapper from "./Components/wrapper/wrapper";
import {useLayoutEffect, useState} from "react";


function App() {

    const [open, setOpen] = useState(false)
    const [browser, setBrowser] = useState("")

    const handleOpen = () => {
        setOpen(!open)
    }

    useLayoutEffect(() => {
        setBrowser(navigator.userAgentData.brands[1])
    }, [])


    return (
        <div className="app">
            {browser.brand === "Google Chrome" && browser.version === "109"
                ? (!open ?
                    <button
                        className="opener"
                        onClick={handleOpen}>
                        Open the List
                    </button>
                    : <Wrapper open={open} handleOpen={handleOpen}/>)
                : <div className="error"> Please use Google Chrome's latest version to open correctly the app. </div>
            }
        </div>
    )

}

export default App;