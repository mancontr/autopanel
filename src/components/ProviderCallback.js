import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { useAutoPanel } from '../api'

export const ProviderCallback = ({ provider }) => {
  const autopanel = useAutoPanel()
  useEffect(() => {
    autopanel.callback(provider)
  }, [])

  return <h1><FormattedMessage id="loading" /></h1>
}

ProviderCallback.propTypes = {
  provider: PropTypes.string.isRequired
}

export default ProviderCallback
