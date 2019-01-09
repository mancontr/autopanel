import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { useAutoPanel } from '../api'

export const ProviderCallback = (props) => {
  const autopanel = useAutoPanel()
  useEffect(() => {
    const provider = props.params.provider
    autopanel.callback(provider, props)
  }, [])

  return <h1><FormattedMessage id="loading" /></h1>
}

ProviderCallback.propTypes = {
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
}

export default ProviderCallback
