import React, { useRef } from 'react'
import "./Board.css"
import { observer } from 'mobx-react'
import Store from "../Store"
import { FaDownload } from 'react-icons/fa'

const { drawingBoardStore } = Store

function DraggableShape({ x, y, width, height, fill, onMouseDown, shapeIndex }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        onMouseDown={(e) => onMouseDown(e, shapeIndex, "drag")}
        cursor="move"
      />
      <rect
        x={x + width - 10}
        y={y + height - 10}
        width="10"
        height="10"
        fill="black"
        onMouseDown={(e) => onMouseDown(e, shapeIndex, "resize")}
        cursor="se-resize"
      />
    </g>
  )
}

function Board() {

  const drawingRef = useRef()

  const handleMouseDown = (event, index, action) => {
    drawingBoardStore.setIsShapeDragged(true)
    drawingBoardStore.setDraggedShapeIndex(index)
    drawingBoardStore.setShapeAction(action)
    const { clientX, clientY } = event
    const { left, top } = event.target.getBoundingClientRect()
    drawingBoardStore.setOffset({ x: clientX - left, y: clientY - top })
    drawingBoardStore.selectedShapeIndex = index
  }

  const handleMouseMove = (event) => {
    if (!drawingBoardStore.isShapeDragged || !drawingBoardStore.shapeAction)
      return
    const { clientX, clientY } = event
    const newShapes = [...drawingBoardStore.shapePaths]
    if (drawingBoardStore.shapeAction === "drag") {
      newShapes[drawingBoardStore.draggedShapeIndex] = {
        ...newShapes[drawingBoardStore.draggedShapeIndex],
        x: clientX - drawingBoardStore.offset.x - 60,
        y: clientY - drawingBoardStore.offset.y - 60
      }
    } else if (drawingBoardStore.shapeAction === "resize") {
      const originalShape = newShapes[drawingBoardStore.draggedShapeIndex]
      newShapes[drawingBoardStore.draggedShapeIndex] = {
        ...originalShape,
        width: Math.max(10, clientX - originalShape.x),
        height: Math.max(10, clientY - originalShape.y)
      }
    }
    drawingBoardStore.setShapePath(newShapes)
  }

  const handleMouseUp = () => {
    drawingBoardStore.setIsShapeDragged(false)
    drawingBoardStore.setDraggedShapeIndex(null)
    drawingBoardStore.setShapeAction(null)
  }

  const handleSVGExportClick = () => {
    const svg = drawingRef.current.innerHTML
    const blob = new Blob([svg], { type: "text/html" })
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = objectUrl
    link.download = "shapes-export.html"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => URL.revokeObjectURL(objectUrl))
  }

  return <div className="board">
    <div><button className="button"><FaDownload onClick={handleSVGExportClick} /></button></div>
    <svg className="board-svg-panel"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={drawingRef}
    >
      {drawingBoardStore.shapePaths.map((shape, index) => (
        <DraggableShape
          key={index}
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          fill={shape.fill}
          onMouseDown={handleMouseDown}
          shapeIndex={index}
        />
      ))}
    </svg>
  </div>
}

export default observer(Board)