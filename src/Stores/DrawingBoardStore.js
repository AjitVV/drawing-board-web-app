import { action, makeObservable, observable } from "mobx"

/**
 * Store to manage all the states of Drawing Board
 */
export default class DrawingBoardStore {
    selectedShapeIndex = null
    shapePaths = new Array()
    isShapeDragged = false
    draggedShapeIndex = null
    offset = { x: 0, y: 0 }
    shapeAction = null
    stack = new Array()

    /**
     * Mark the required variable and functions are observable
     */
    constructor() {
        makeObservable(this, {
            shapePaths: observable,
            isShapeDragged: observable,
            draggedShapeIndex: observable,
            offset: observable,
            shapeAction: observable,
            setShapePath: action,
            setIsShapeDragged: action,
            setDraggedShapeIndex: action,
            setOffset: action,
            setShapeAction: action
        })
    }

    /**
     * Mobx action function to manage various actions of a shape
     * @param {string} shape 
     */
    setSelectedShape = (shape) => {
        switch (shape) {
            case "SQUARE":
                this.setShapePath({ x: 50, y: 50, width: 100, height: 100, fill: 'gray' }, "new")
                break
            case "RECTANGLE":
                this.setShapePath({ x: 200, y: 150, width: 150, height: 100, fill: 'gray' }, "new")
                break
            case "CLEAR":
                this.stack = new Array()
                this.setShapePath(new Array(), "")
                break
            case "RED":
                var newShapes = [...this.shapePaths]
                var updatedShape = {
                    ...newShapes[this.selectedShapeIndex],
                    fill: "red"
                }
                newShapes.push(updatedShape)
                this.setShapePath(newShapes, "")
                break
            case "BLUE":
                var newShapes = [...this.shapePaths]
                var updatedShape = {
                    ...newShapes[this.selectedShapeIndex],
                    fill: "blue"
                }
                newShapes.push(updatedShape)
                this.setShapePath(newShapes, "")
                break
            case "GREEN":
                var newShapes = [...this.shapePaths]
                var updatedShape = {
                    ...newShapes[this.selectedShapeIndex],
                    fill: "green"
                }
                newShapes.push(updatedShape)
                this.setShapePath(newShapes, "")
                break
            case "UNDO":
                var newShapes = [...this.shapePaths]
                var lastAction = newShapes.pop()
                if (lastAction) {
                    this.stack.push(lastAction)
                    this.setShapePath(newShapes, "")
                }
                break
            case "REDO":
                var newShapes = [...this.shapePaths]
                var lastAction = this.stack.pop()
                if (lastAction) {
                    newShapes.push(lastAction)
                    this.setShapePath(newShapes, "")
                }
                break
        }
    }

    /**
     * A mobx action which take the path of shape and the action and update the observable
     * @param {object} path 
     * @param {string} action 
     */
    setShapePath = (path, action) => {
        action === "new" ? this.shapePaths.push(path) : this.shapePaths = path
    }

    /**
     * A mobx action for controlling state of shape while dragging
     * @param {boolean} isDragged 
     */
    setIsShapeDragged = (isDragged) => {
        this.isShapeDragged = isDragged
    }

    /**
     * A mobx action save the state of selected shape
     * @param {number} index 
     */
    setDraggedShapeIndex = (index) => {
        this.draggedShapeIndex = index
    }

    setOffset = (offset) => {
        this.offset = offset
    }

    /**
     * A mobx action to save the state of activity done on shape
     * @param {string} action 
     */
    setShapeAction = (action) => {
        this.shapeAction = action
    }

}