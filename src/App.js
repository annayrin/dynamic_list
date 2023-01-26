import "./App.css";
import Wrapper from "./Components/wrapper/wrapper";
import {useEffect, useState} from "react";
import Trimmer from "./Components/trimmer/trimmer";


function App() {

    const [open, setOpen] = useState(null)
    const [browser, setBrowser] = useState("")

    const handleOpen = (item) => {
        setOpen(item)
    }

    useEffect(() => {
        setBrowser(navigator.userAgentData.brands[1])
    }, [])


    return (
        <div className="app">
            {browser.brand === "Google Chrome" && browser.version === "109"
                ? (!open ?
                        <div className="container">
                            <button
                                className="opener"
                                onClick={handleOpen.bind(this, "list")}>
                                Open the List
                            </button>
                            <button
                                className="opener"
                                onClick={handleOpen.bind(this, "trimmer")}>
                                Open trimmer
                            </button>
                        </div>
                        : open === "list" ?
                            <Wrapper handleOpen={handleOpen.bind(this, null)}/>
                            : <Trimmer handleOpen={handleOpen.bind(this,null)}/>
                )
                : <div className="error">
                    Please use Google Chrome's latest version
                    to open correctly the app.
                </div>
            }
        </div>
    )

}

export default App;