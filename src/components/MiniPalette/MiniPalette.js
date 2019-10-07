import React from 'react'
import { withStyles } from '@material-ui/styles'
import styles from '../../styles/MiniPalette.styles'
import DeleteIcon from '@material-ui/icons/Delete'

const MiniPalette = props => {
  const { classes, paletteName, emoji, colors, goToPalette, openDialog, id } = props
  const miniColorBoxes = colors.map(color => (
    <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name} />
  ))

  const handleDeletePalette = e => {
    e.stopPropagation()
    openDialog(id)
  }

  return (
    <div
      className={classes.root}
      onClick={goToPalette}
      onKeyPress={goToPalette}
      role="presentation"
    >
      <DeleteIcon
        className={classes.deleteIcon}
        style={{ transition: 'all 0.3s ease-in-out' }}
        onClick={handleDeletePalette}
      />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  )
}

export default withStyles(styles)(MiniPalette)
