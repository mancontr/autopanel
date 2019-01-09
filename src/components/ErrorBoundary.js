import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import './ErrorBoundary.sass'

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    fallback: PropTypes.any
  }

  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError () {
    return { hasError: true }
  }

  render () {
    const path =
      'm1.87-2.33e-6c-1.03 0-1.87.834-1.87 1.87v49.2c0 1.04.832 1.87 1.87 ' +
      '1.87h62.4c1.03 0 1.87-.834 1.87-1.87v-49.2c0-1.04-.832-1.87-1.87-1.87' +
      'zm54.4.613a1.32 1.33 0 0 1 1.32 1.33 1.32 1.33 0 0 1-1.32 1.33 1.32 ' +
      '1.33 0 0 1-1.32-1.33 1.32 1.33 0 0 1 1.32-1.33zm3.41 0a1.32 1.33 0 0 ' +
      '1 1.32 1.33 1.32 1.33 0 0 1-1.32 1.33 1.32 1.33 0 0 1-1.32-1.33 1.32 ' +
      '1.33 0 0 1 1.32-1.33zm3.41 0a1.32 1.33 0 0 1 1.32 1.33 1.32 1.33 0 0 ' +
      '1-1.32 1.33 1.32 1.33 0 0 1-1.32-1.33 1.32 1.33 0 0 1 1.32-1.33zm-60 ' +
      '3.27h60.2c1.03 0 1.86.834 1.86 1.87v44.3c0 1.04-.831 1.87-1.86 1.87h' +
      '-60.2c-1.03 0-1.87-.834-1.87-1.87v-44.3c0-1.04.832-1.87 1.87-1.87z'
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="page-error">
          <svg width="250" height="200" version="1.1" viewBox="0 0 66.1 52.9">
            <path d={path} fill="#888"/>
            <g fill="none" stroke="#888"  strokeLinecap="round" strokeWidth=".802">
              <path d="m20.4 30.5 26.2 6.31"/>
              <path d="m20 14.1 6.07 5.52"/>
              <path d="m26.1 14.1-6.07 5.52"/>
              <path d="m40.7 14 6.07 5.52"/>
              <path d="m46.7 14-6.07 5.52"/>
            </g>
          </svg>
          <FormattedMessage id="error.1" />
          <FormattedMessage id="error.2" />
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
