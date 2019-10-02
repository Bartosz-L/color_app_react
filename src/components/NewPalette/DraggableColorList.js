import React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import DraggableColorBox from './DraggableColorBox'

const DraggableColorList = SortableContainer(props => {
  const { colors, handleRemoveBox } = props

  return (
    <div style={{ height: '100%' }}>
      {colors.map((color, index) => (
        <DraggableColorBox
          index={index}
          color={color.color}
          name={color.name}
          key={color.name}
          handleRemoveBox={() => handleRemoveBox(color.name)}
        />
      ))}
    </div>
  )
})
export default DraggableColorList
