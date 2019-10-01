import React from 'react'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { withStyles } from '@material-ui/styles'
import useAsyncState from '../../utils/useAsyncState'
import styles from '../../styles/colorBox.styles'

const ColorBox = props => {
  const [copied, setCopied] = useAsyncState(false)
  const { background, name, singlePaletteURL, showingFullPalette, classes } = props

  const changeCopyState = async () => {
    const newCopiedVal = await setCopied(true)
    setTimeout(() => {
      setCopied(!newCopiedVal)
    }, 1500)
  }

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className={classes.ColorBox}>
        <div
          style={{ background }}
          className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
        />
        <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button type="button" className={classes.copyButton}>
            Copy
          </button>
        </div>
        {showingFullPalette && (
          <Link to={singlePaletteURL} onClick={e => e.stopPropagation()}>
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  )
}

export default withStyles(styles)(ColorBox)
