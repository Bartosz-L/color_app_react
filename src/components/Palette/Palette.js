import React from 'react'
import './Palette.scss'
import ColorBox from '../ColorBox/ColorBox'

const Palette = props => {
  const colorBoxes = props.palette.colors.map(color => (
    <ColorBox background={color.color} name={color.name} />
  ))
  console.log(colorBoxes)
  return (
    <div className="Palette">
      {/* navbar */}
      <div className="Palette-colors">{colorBoxes}</div>
      {/* footer */}
    </div>
  )
}

export default Palette
