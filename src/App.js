import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import NewPaletteForm from './components/NewPalette/NewPaletteForm'
import Page from './components/Page/Page'
import Palette from './components/Palette/Palette'
import PaletteList from './components/PaletteList/PaletteList'
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette'
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
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition classNames="page" timeout={300} key={location.key}>
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new"
                  render={routerProps => (
                    <Page>
                      <NewPaletteForm
                        savePalette={savePalette}
                        routerProps={routerProps}
                        palettes={palettes}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        palettes={palettes}
                        routerProps={routeProps}
                        deletePalette={deletePalette}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <Page>
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <Page>
                      <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>
  )
}

export default App
