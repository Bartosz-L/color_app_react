import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { CssBaseline, AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SavePalettePopupForm from './SavePalettePopupForm'
import useStyles from '../../styles/PaletteFormNav.styles'

const PaletteFormNav = props => {
  const classes = useStyles()
  const {
    colors,
    palettes,
    open,
    handleDrawerOpen,
    savePalette,
    setErrorMessage,
    setOpenSnackbar,
    history,
  } = props
  const [formShowing, setFormShowing] = useState(false)

  const showForm = () => {
    setFormShowing(true)
  }

  const hideForm = () => {
    setFormShowing(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color="default"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navButtons}>
          <Link to="/">
            <Button type="button" variant="contained" color="secondary" className={classes.button}>
              Go Back
            </Button>
          </Link>
          <Button variant="contained" color="primary" onClick={showForm} className={classes.button}>
            Save Palette
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <SavePalettePopupForm
          classes={classes}
          colors={colors}
          palettes={palettes}
          savePalette={savePalette}
          setErrorMessage={setErrorMessage}
          setOpenSnackbar={setOpenSnackbar}
          history={history}
          hideForm={hideForm}
        />
      )}
    </div>
  )
}

export default PaletteFormNav
