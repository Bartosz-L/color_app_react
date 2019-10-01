import React, { useState } from 'react'
import './Palette.scss'
import ColorBox from '../ColorBox/ColorBox'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Palette = props => {
  const [level, setLevel] = useState(500)
  const [colorFormat, setColorFormat] = useState('hex')
  const { colors, paletteName, emoji, id } = props.palette

  const changeLevel = newLevel => {
    setLevel(newLevel)
  }

  const changeColorFormat = value => {
    setColorFormat(value)
  }

  const colorBoxes = colors[level].map(color => (
    <ColorBox
      background={color[colorFormat]}
      name={color.name}
      key={color.id}
      singlePaletteURL={`/palette/${id}/${color.id}`}
      showingFullPalette
    />
  ))

  return (
    <div className="Palette">
      <Navbar
        level={level}
        changeLevel={changeLevel}
        changeColorFormat={changeColorFormat}
        isSingleColor={false}
      />
      <div className="Palette-colors">{colorBoxes}</div>
      <Footer paletteName={paletteName} emoji={emoji} />
    </div>
  )
}

export default Palette
