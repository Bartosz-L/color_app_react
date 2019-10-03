import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Palette from './components/Palette/Palette'
import PaletteList from './components/PaletteList/PaletteList'
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette'
import NewPaletteForm from './components/NewPalette/NewPaletteForm'
import seedColors from './seedColors'
import { generatePalette } from './utils/colorHelpers'

const App = () => {
  let savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
  const [palettes, setPalettes] = useState(savedPalettes || seedColors)

  const findPalette = id => {
    return palettes.find(palette => {
      return palette.id === id
    })
  }

  const syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes))
  }

  const savePalette = newPalette => {
    setPalettes([...palettes, newPalette])
  }

  const deletePalette = id => {
    setPalettes(palettes.filter(palette => palette.id !== id))
  }

  useEffect(() => {
    syncLocalStorage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palettes])

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={routerProps => (
            <NewPaletteForm
              savePalette={savePalette}
              routerProps={routerProps}
              palettes={palettes}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={routeProps => (
            <PaletteList
              palettes={palettes}
              routerProps={routeProps}
              deletePalette={deletePalette}
            />
          )}
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
