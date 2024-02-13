import React from "react"
import "./ActionPanel.css"
import Button from "./Button"
import { FaSquare, FaTimes, FaUndo, FaRedo } from 'react-icons/fa'

function ActionPanel() {

    const onClickHandler = (event) => event.stopPropagation()

    return <div className="action-panel">
        <Button value="SQUARE"> <FaSquare onClick={onClickHandler} /> </Button>
        <Button value="RECTANGLE"> <FaSquare onClick={onClickHandler} /> </Button>
        <Button value="UNDO"><FaUndo onClick={onClickHandler} /></Button>
        <Button value="REDO"><FaRedo onClick={onClickHandler} /></Button>
        <Button value="RED"><div className="shape-color-red"></div></Button>
        <Button value="GREEN"><div className="shape-color-green"></div></Button>
        <Button value="BLUE"><div className="shape-color-blue"></div></Button>
        <Button value="CLEAR"><FaTimes onClick={onClickHandler} /></Button>
    </div>
}

export default ActionPanel