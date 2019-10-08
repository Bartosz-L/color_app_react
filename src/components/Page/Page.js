import React from 'react'

import useStyles from '../../styles/Page.styles'

const Page = ({ children }) => {
  const classes = useStyles()
  return <section className={classes.page}>{children}</section>
}

export default Page
