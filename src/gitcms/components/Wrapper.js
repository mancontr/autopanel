import React from 'react'
import PropTypes from 'prop-types'
import { WithGitcms } from 'src/gitcms'
import ErrorBoundary from 'src/gitcms/components/ErrorBoundary'

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
