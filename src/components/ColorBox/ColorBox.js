import { withStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'

import styles from '../../styles/ColorBox.styles'
import useAsyncState from '../../utils/useAsyncState'

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
          className={clsx(classes.copyOverlay, {
            [classes.showOverlay]: copied,
          })}
        />
        <div
          className={clsx(classes.copyMessage, {
            [classes.showMessage]: copied,
          })}
        >
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
