import React from 'react'
import PropTypes from 'prop-types'
import { WithAutoPanel } from '../api'
import ErrorBoundary from './ErrorBoundary'

const Wrapper = ({ settings, children }) => {
  return (
    <ErrorBoundary>
      <WithAutoPanel settings={settings}>
        {children}
      </WithAutoPanel>
    </ErrorBoundary>
  )
}

Wrapper.propTypes = {
  settings: PropTypes.object,
  children: PropTypes.any
}

export default Wrapper
