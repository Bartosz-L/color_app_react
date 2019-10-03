import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const SavePalettePopupForm = props => {
  const {
    classes,
    colors,
    palettes,
    savePalette,
    setErrorMessage,
    setOpenSnackbar,
    history,
    hideForm,
    formShowing,
  } = props
  const [newPaletteName, setNewPaletteName] = useState('')

  const handleChangeNewPaletteName = e => {
    setNewPaletteName(e.target.value)
  }

  const handleSavePalette = e => {
    e.preventDefault()
    let newPName = newPaletteName
    const isPaletteNameUnique = palettes.every(
      ({ paletteName }) => paletteName.toLowerCase() !== newPName.toLowerCase(),
    )

    if (isPaletteNameUnique) {
      const newPalette = {
        paletteName: newPName,
        id: newPName.toLowerCase().replace(/ /g, '-'),
        colors: colors,
      }
      savePalette(newPalette)
      history.push('/')
    } else {
      setErrorMessage('Palette name is not unique')
      setOpenSnackbar(true)
    }
  }
  return (
    <Dialog open={formShowing} onClose={hideForm} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
      <form autoComplete="off" onSubmit={handleSavePalette} name="newPaletteName">
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new palette. Make sure its unique.
          </DialogContentText>
          <TextField
            id="newPaletteName"
            label="palette name"
            className={classes.textField}
            value={newPaletteName}
            onChange={handleChangeNewPaletteName}
            margin="normal"
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hideForm} color="primary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save Palette
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default SavePalettePopupForm
