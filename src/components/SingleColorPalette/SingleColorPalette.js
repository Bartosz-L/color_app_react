import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ColorBox from '../ColorBox/ColorBox'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const SingleColorPalette = props => {
  const [shades, setShades] = useState([])
  const [colorFormat, setColorFormat] = useState('hex')

  const { palette, colorId } = props

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
    <ColorBox key={color.name} name={color.name} background={color[colorFormat]} showLink={false} />
  ))

  return (
    <div className="SingleColorPalette Palette">
      <Navbar changeColorFormat={changeColorFormat} isSingleColor />
      <div className="Palette-colors">
        {colorBoxes}
        <div className="ColorBox go-back">
          <Link className="back-button" to={`/palette/${palette.id}`}>
            GO BACK
          </Link>
        </div>
      </div>
      <Footer paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  )
}

export default SingleColorPalette
