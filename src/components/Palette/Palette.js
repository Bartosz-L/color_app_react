import React, { useState } from 'react'
import './Palette.scss'
import ColorBox from '../ColorBox/ColorBox'
import Navbar from '../Navbar/Navbar'

const Palette = props => {
  const [level, setLevel] = useState(500)
  const [colorFormat, setColorFormat] = useState('hex')
  const { colors, paletteName, emoji } = props.palette

  const changeLevel = newLevel => {
    setLevel(newLevel)
  }

  const changeColorFormat = value => {
    setColorFormat(value)
  }

  const colorBoxes = colors[level].map(color => (
    <ColorBox background={color[colorFormat]} name={color.name} key={color.id} />
  ))

  return (
    <div className="Palette">
      <Navbar level={level} changeLevel={changeLevel} changeColorFormat={changeColorFormat} />
      <div className="Palette-colors">{colorBoxes}</div>
      <footer className="Palette-footer">
        {paletteName}
        <span className="emoji">{emoji}</span>
      </footer>
    </div>
  )
}

export default Palette
