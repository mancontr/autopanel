import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { useGitcms } from '../api'

export const ProviderCallback = (props) => {
  const gitcms = useGitcms()
  useEffect(() => {
    const provider = props.params.provider
    gitcms.callback(provider, props)
      .then(() => props.router.replace('/'))
  }, [])

  return <h1><FormattedMessage id="loading" /></h1>
}

ProviderCallback.propTypes = {
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
}

export default ProviderCallback
