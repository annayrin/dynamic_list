import "./App.css";
import Wrapper from "./Components/wrapper/wrapper";
import {useState} from "react";


function App() {

    const [open, setOpen] = useState(false)


    return (
        <div className="app">
            {!open ? <button className="opener" onClick={setOpen.bind(this,!open)}>Open the List</button> : <Wrapper open={open} setOpen={setOpen} />}
        </div>
    )

}
export default App;