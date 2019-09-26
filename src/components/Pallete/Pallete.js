import React from 'react'
import './Pallete.scss'
import ColorBox from '../ColorBox/ColorBox'

const Pallete = props => {
  const colorBoxes = props.pallete.colors.map(color => (
    <ColorBox background={color.color} name={color.name} />
  ))
  console.log(colorBoxes)
  return (
    <div className="Pallete">
      {/* navbar */}
      <div className="Pallete-colors">{colorBoxes}</div>
      {/* footer */}
    </div>
  )
}

export default Pallete
