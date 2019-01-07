import React from 'react'
import PropTypes from 'prop-types'
import { WithGitcms } from '../api'
import ErrorBoundary from './ErrorBoundary'

const Wrapper = ({ children }) => {
  return (
    <ErrorBoundary>
      <WithGitcms>
        {children}
      </WithGitcms>
    </ErrorBoundary>
  )
}

Wrapper.propTypes = {
  children: PropTypes.element
}

export default Wrapper
