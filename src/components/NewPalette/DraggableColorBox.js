import React from 'react'
import { withStyles } from '@material-ui/styles'
import styles from '../../styles/DraggableColorBox.styles'
import DeleteIcon from '@material-ui/icons/Delete'
import { SortableElement } from 'react-sortable-hoc'

const DraggableColorBox = SortableElement(props => {
  const { color, name, classes, handleRemoveBox } = props

  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleRemoveBox} />
      </div>
    </div>
  )
})

export default withStyles(styles)(DraggableColorBox)
