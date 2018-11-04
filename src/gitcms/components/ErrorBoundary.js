import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import './ErrorBoundary.sass'

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-error">
          <img src={require('src/static/images/error.png')}
            className="error-image" />
          <FormattedMessage id="error.1" />
          <FormattedMessage id="error.2" />
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
