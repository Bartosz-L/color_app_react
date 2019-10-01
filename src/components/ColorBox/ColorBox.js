import React from 'react'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { withStyles } from '@material-ui/styles'
import chroma from 'chroma-js'
import useAsyncState from '../../utils/useAsyncState'
import './ColorBox.scss'

const styles = {
  ColorBox: {
    height: props => (props.showingFullPalette ? '25%' : '50%'),
    width: '20%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    '&:hover button': {
      opacity: 1,
    },
  },
  copyText: {
    color: props => (chroma(props.background).luminance() >= 0.7 ? 'rgba(0, 0, 0, 0.5)' : 'white'),
  },
  colorName: {
    color: props => (chroma(props.background).luminance() <= 0.08 ? 'white' : 'rgba(0, 0, 0, 0.5)'),
  },
  seeMore: {
    color: props => (chroma(props.background).luminance() >= 0.7 ? 'rgba(0, 0, 0, 0.5)' : 'white'),
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
    color: props => (chroma(props.background).luminance() >= 0.7 ? 'rgba(0, 0, 0, 0.5)' : 'white'),
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: 'none',
    opacity: 0,
  },
}

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
        <div style={{ background }} className={`copy-overlay ${copied && 'show'}`} />
        <div className={`copy-msg ${copied && 'show'}`}>
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
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
