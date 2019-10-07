import React from 'react'
import useAsyncState from '../../utils/useAsyncState'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import MiniPalette from '../MiniPalette/MiniPalette'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import useStyles from '../../styles/PaletteList.styles'

const PaletteList = props => {
  const [openDeleteDialog, setOpenDeleteDialog] = useAsyncState(false)
  const [deletingId, setDeletingId] = useAsyncState('')
  const classes = useStyles()

  const {
    palettes,
    routerProps: { history },
    deletePalette,
  } = props

  const goToPalette = id => {
    history.push(`/palette/${id}`)
  }
  const openDialog = async id => {
    await setDeletingId(id)
    setOpenDeleteDialog(true)
  }

  const closeDialog = () => {
    setOpenDeleteDialog(false)
    setDeletingId('')
  }

  const handleDelete = async () => {
    await deletePalette(deletingId)
    closeDialog()
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
                openDialog={openDialog}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={openDialog}>
        <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar className={classes.confirm}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar className={classes.cancel}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  )
}

export default PaletteList
