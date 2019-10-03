import React from 'react'
import useAsyncState from '../../utils/useAsyncState'
import { ChromePicker } from 'react-color'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
      />

      <form autoComplete="off" onSubmit={handleAddNewColor} name="newColorName">
        <TextField
          id="newColorName"
          label="color name"
          className={classes.textField}
          value={newColorName}
          onChange={handleChangeNewName}
          margin="normal"
          required
        />
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
          type="submit"
          size="small"
          disabled={paletteIsFull}
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </form>
    </div>
  )
}

export default ColorPicker
