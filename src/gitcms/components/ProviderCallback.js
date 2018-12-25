import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { callback } from 'src/store/actions/gitcms'

export const ProviderCallback = (props) => {

  useEffect(() => {
    // Find this provider
    const provider = props.params.provider
    props.callback(provider, props)
      .then(() => props.router.replace('/'))
  }, [])

  return <h1><FormattedMessage id="loading" /></h1>
}

ProviderCallback.propTypes = {
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  callback: PropTypes.func.isRequired
}

export default connect(null, { callback })(ProviderCallback)
