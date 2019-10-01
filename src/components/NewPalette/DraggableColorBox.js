import React from 'react'
import { withStyles } from '@material-ui/styles'
import styles from '../../styles/DraggableColorBox'

const DraggableColorBox = props => {
  const { color, classes } = props
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      {color}
    </div>
  )
}

export default withStyles(styles)(DraggableColorBox)
