import React from "react"
import Store from "../Store"
import { observer } from "mobx-react"

function Button(props) {
    const { drawingBoardStore } = Store

    return (
        <button
            className="button"
            value={props.value}
            onClick={(e) => drawingBoardStore.setSelectedShape(e.target.value)}
        >
            {props.children}
        </button>
    )
}
export default observer(Button)