import React from 'react'
import PropTypes from 'prop-types'
import { WithAutoPanel } from '../api'
import ErrorBoundary from './ErrorBoundary'

const Wrapper = ({ children }) => {
  return (
    <ErrorBoundary>
      <WithAutoPanel>
        {children}
      </WithAutoPanel>
    </ErrorBoundary>
  )
}

Wrapper.propTypes = {
  children: PropTypes.element
}

export default Wrapper
