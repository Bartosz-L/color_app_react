import React from 'react'
import './PaletteList.scss'
import { withStyles } from '@material-ui/styles'
import MiniPalette from '../MiniPalette/MiniPalette'

const styles = {
  root: {
    backgroundColor: 'rgb(102, 153, 255)',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    color: 'white',
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%',
  },
}

const PaletteList = props => {
  const {
    palettes,
    classes,
    routerProps: { history },
  } = props

  const goToPalette = id => {
    history.push(`/palette/${id}`)
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
        </nav>
        <div className={classes.palettes}>
          {palettes.map(palette => (
            <MiniPalette
              paletteName={palette.paletteName}
              emoji={palette.emoji}
              colors={palette.colors}
              goToPalette={() => goToPalette(palette.id)}
              key={palette.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(PaletteList)
