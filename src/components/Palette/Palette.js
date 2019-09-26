import React, { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './Palette.scss'
import ColorBox from '../ColorBox/ColorBox'

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
      <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
      {/* navbar */}
      <div className="Palette-colors">{colorBoxes}</div>
      {/* footer */}
    </div>
  )
}

export default Palette
