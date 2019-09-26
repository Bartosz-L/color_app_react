import React from 'react'
import Palette from './components/Palette/Palette'
import seedColors from './seedColors'
import { generatePalette } from './utils/colorHelpers'

function App() {
  const palette = generatePalette(seedColors[4])

  return (
    <div>
      <Palette palette={palette} />
    </div>
  )
}

export default App
