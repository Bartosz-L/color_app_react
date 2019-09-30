import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Palette from './components/Palette/Palette'
import seedColors from './seedColors'
import { generatePalette } from './utils/colorHelpers'

const App = () => {
  const findPalette = id => {
    return seedColors.find(palette => {
      return palette.id === id
    })
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <h1>palette list</h1>} />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />
          )}
        />
      </Switch>

      {/* <Palette palette={palette} /> */}
    </Router>
  )
}

export default App
