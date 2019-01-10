import React from 'react'
import PropTypes from 'prop-types'
import { useAutoPanel } from '../api'

export const Link = ({ to, ...props }) => {
  const autopanel = useAutoPanel()
  const settings = autopanel.getSettings()
  const href = (settings.prefix || '') + to
  const handler = (e) => {
    e.preventDefault()
    settings.navigate(href)
  }
  return <a {...props} href={href} onClick={handler} />
}

Link.propTypes = {
  to: PropTypes.string.isRequired
}

export default Link
