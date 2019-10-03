import React from 'react'
import useAsyncState from '../../utils/useAsyncState'
import { ChromePicker } from 'react-color'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  picker: {
    width: '100% !important',
    marginTop: '2rem',
  },
  addColor: {
    width: '100%',
    padding: '1rem',
    marginTop: '0.5rem',
    fontSize: '1rem',
  },
  colorNameInput: {
    width: '100%',
    height: '70px',
  },
}))

const ColorPicker = props => {
  const { paletteIsFull, colors, setColors, setErrorMessage, setOpenSnackbar } = props
  const classes = useStyles()

  const [currentColor, setCurrentColor] = useAsyncState('teal')
  const [newColorName, setNewColorName] = useAsyncState('')

  const handleAddNewColor = async e => {
    e.preventDefault()
    const newColor = {
      color: currentColor,
      name: newColorName,
    }

    const isColorNameUnique = colors.every(
      ({ name }) => name.toLowerCase() !== newColor.name.toLowerCase(),
    )
    const isColorUnique = colors.every(({ color }) => color !== newColor.color)

    if (isColorNameUnique && isColorUnique) {
      await setColors([...colors, newColor])
      await setNewColorName('')
    } else if (!isColorNameUnique) {
      setErrorMessage('Name is not unique')
      setOpenSnackbar(true)
    } else if (!isColorUnique) {
      await setErrorMessage('Color is already taken')
      await setOpenSnackbar(true)
    }
  }

  const handleChangeNewName = e => {
    setNewColorName(e.target.value)
  }
  return (
    <div>
      <ChromePicker
        color={currentColor}
        onChangeComplete={newColor => setCurrentColor(newColor.hex)}
        className={classes.picker}
      />

      <form autoComplete="off" onSubmit={handleAddNewColor} name="newColorName">
        <TextField
          id="newColorName"
          label="color name"
          value={newColorName}
          onChange={handleChangeNewName}
          margin="normal"
          variant="filled"
          required
          className={classes.colorNameInput}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="small"
          disabled={paletteIsFull}
          className={classes.addColor}
          style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </form>
    </div>
  )
}

export default ColorPicker
