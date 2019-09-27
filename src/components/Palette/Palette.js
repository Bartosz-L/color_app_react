import React, { useState } from 'react'
import './Palette.scss'
import ColorBox from '../ColorBox/ColorBox'
import Navbar from '../Navbar/Navbar'

const Palette = props => {
  const [level, setLevel] = useState(500)
  const { colors } = props.palette

  const changeLevel = newLevel => {
    setLevel(newLevel)
  }

  const colorBoxes = colors[level].map(color => (
    <ColorBox background={color.hex} name={color.name} />
  ))

  return (
    <div className="Palette">
      <Navbar level={level} changeLevel={changeLevel} />
      <div className="Palette-colors">{colorBoxes}</div>
      {/* footer */}
    </div>
  )
}

export default Palette
