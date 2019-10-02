import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Palette from './components/Palette/Palette'
import PaletteList from './components/PaletteList/PaletteList'
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette'
import NewPaletteForm from './components/NewPalette/NewPaletteForm'
import seedColors from './seedColors'
import { generatePalette } from './utils/colorHelpers'

const App = () => {
  const [palettes, setPalettes] = useState(seedColors)

  const findPalette = id => {
    return palettes.find(palette => {
      return palette.id === id
    })
  }

  const savePalette = newPalette => {
    setPalettes([...palettes, newPalette])
  }
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={routerProps => (
            <NewPaletteForm savePalette={savePalette} routerProps={routerProps} />
          )}
        />
        <Route
          exact
          path="/"
          render={routeProps => <PaletteList palettes={palettes} routerProps={routeProps} />}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
            />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />
          )}
        />
      </Switch>
    </Router>
  )
}

export default App
