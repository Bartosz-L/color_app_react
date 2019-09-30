import React, { useState, useEffect } from 'react'
import ColorBox from '../ColorBox/ColorBox'

const SingleColorPalette = props => {
  const [shades, setShades] = useState([])
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

  useEffect(() => {
    setShades(gatherShades(palette, colorId))
  }, [palette, colorId])

  return (
    <div className="Palette">
      <h1>Single Color Palette</h1>
      <div className="Palette-colors">
        {shades.map(color => (
          <ColorBox key={color.name} name={color.name} background={color.hex} showLink={false} />
        ))}
      </div>
    </div>
  )
}

export default SingleColorPalette
