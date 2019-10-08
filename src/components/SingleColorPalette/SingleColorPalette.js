import { withStyles } from '@material-ui/styles'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'

import styles from '../../styles/Palette.styles'
import ColorBox from '../ColorBox/ColorBox'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

const SingleColorPalette = props => {
  const [shades, setShades] = useState([])
  const [colorFormat, setColorFormat] = useState('hex')

  const { palette, colorId, classes } = props

  const gatherShades = (wholePalette, colorToFilterBy) => {
    // return all shades of given color
    const allColors = wholePalette.colors
    let shadesArr = []

    Object.keys(allColors).forEach(key => {
      shadesArr = shadesArr.concat(allColors[key].filter(color => color.id === colorToFilterBy))
    })
    // without "50 level" shade - it's the first one
    return shadesArr.slice(1)
  }

  const changeColorFormat = value => {
    setColorFormat(value)
  }

  useEffect(() => {
    setShades(gatherShades(palette, colorId))
  }, [palette, colorId])

  const colorBoxes = shades.map(color => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[colorFormat]}
      showingFullPalette={false}
    />
  ))

  return (
    <div className={classes.Palette}>
      <Navbar changeColorFormat={changeColorFormat} isSingleColor />
      <div className={classes.PaletteColors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${palette.id}`}>GO BACK</Link>
        </div>
      </div>
      <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  )
}

export default withStyles(styles)(SingleColorPalette)
