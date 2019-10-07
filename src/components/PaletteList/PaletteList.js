import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import MiniPalette from '../MiniPalette/MiniPalette'
import styles from '../../styles/PaletteList.styles'

const PaletteList = props => {
  const {
    palettes,
    classes,
    routerProps: { history },
    deletePalette,
  } = props

  const goToPalette = id => {
    history.push(`/palette/${id}`)
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create New Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map(palette => (
            <CSSTransition key={palette.id} classNames="fade" timeout={300}>
              <MiniPalette
                key={palette.id}
                id={palette.id}
                paletteName={palette.paletteName}
                emoji={palette.emoji}
                colors={palette.colors}
                goToPalette={() => goToPalette(palette.id)}
                deletePalette={deletePalette}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  )
}

export default withStyles(styles)(PaletteList)
