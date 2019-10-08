import { Button, Divider, Drawer, IconButton, Typography } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import arrayMove from 'array-move'
import clsx from 'clsx'
import React, { useState } from 'react'

import seedColors from '../../seedColors'
import useStyles from '../../styles/NewPaletteForm.styles'
import useAsyncState from '../../utils/useAsyncState'
import ErrorSnackbar from '../Snackbar/Snackbar'
import ColorPicker from './ColorPicker'
import DraggableColorList from './DraggableColorList'
import PaletteFormNav from './PaletteFormNav'

const NewPaletteForm = props => {
  const {
    routerProps: { history },
    savePalette,
    palettes,
    maxColors,
  } = props

  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [colors, setColors] = useAsyncState(seedColors[0].colors)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const paletteIsFull = colors.length >= maxColors

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleCloseSnackBar = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const handleRemoveBox = colorName => {
    setColors(colors.filter(color => color.name !== colorName))
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex))
  }

  const clearColors = () => {
    setColors([])
  }

  const addRandomColor = () => {
    // pick random color from existing palettes
    const allColors = palettes.map(p => p.colors).flat()
    let randomNumber = Math.floor(Math.random() * allColors.length)
    const randomColor = allColors[randomNumber]

    setColors([...colors, randomColor])
  }

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        palettes={palettes}
        colors={colors}
        savePalette={savePalette}
        setErrorMessage={setErrorMessage}
        setOpenSnackbar={setOpenSnackbar}
        history={history}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.toolsContainer}>
          <div className={classes.tools}>
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>

            <div className={classes.colorHandlingButtons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={clearColors}
                className={classes.colorHandlingButton}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={addRandomColor}
                disabled={paletteIsFull}
                className={classes.colorHandlingButton}
              >
                Random Color
              </Button>
            </div>

            <ColorPicker
              paletteIsFull={paletteIsFull}
              colors={colors}
              setErrorMessage={setErrorMessage}
              setOpenSnackbar={setOpenSnackbar}
              setColors={setColors}
              classes={classes}
            />
          </div>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          handleRemoveBox={handleRemoveBox}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={20}
        />
        <ErrorSnackbar
          open={openSnackbar}
          handleCloseSnackBar={handleCloseSnackBar}
          message={errorMessage}
        />
      </main>
    </div>
  )
}

NewPaletteForm.defaultProps = {
  maxColors: 20,
}

export default NewPaletteForm
