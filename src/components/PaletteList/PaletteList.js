import React from 'react'
import { withStyles } from '@material-ui/styles'
import MiniPalette from '../MiniPalette/MiniPalette'
import styles from '../../styles/PaletteList.styles'

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
