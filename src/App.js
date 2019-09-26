import React from 'react'
import Palette from './components/Palette/Palette'
import seedColors from './seedColors'
import { generatePalette } from './utils/colorHelpers'

function App() {
  console.log(generatePalette(seedColors[4]))
  return (
    <div>
      <Palette palette={seedColors[4]} />
    </div>
  )
}

export default App
