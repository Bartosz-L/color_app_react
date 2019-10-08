import { withStyles } from '@material-ui/styles'
import React, { useState } from 'react'

import styles from '../../styles/Palette.styles'
import ColorBox from '../ColorBox/ColorBox'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

const Palette = props => {
  const [level, setLevel] = useState(500)
  const [colorFormat, setColorFormat] = useState('hex')
  const { colors, paletteName, emoji, id } = props.palette
  const { classes } = props

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
    <div className={classes.Palette}>
      <Navbar
        level={level}
        changeLevel={changeLevel}
        changeColorFormat={changeColorFormat}
        isSingleColor={false}
      />
      <div className={classes.PaletteColors}>{colorBoxes}</div>
      <Footer paletteName={paletteName} emoji={emoji} />
    </div>
  )
}

export default withStyles(styles)(Palette)
