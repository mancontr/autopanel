import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { login } from 'src/store/actions/user'
import Config from '../Config'

export class ProviderCallback extends React.Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  }

  componentDidMount = () => {
    // Find this provider
    const provider = Config.getProvider(this.props.params.provider)
    provider.callback(this.props)
      .then(() => this.props.router.replace('/'))
  }

  render = () => <h1><FormattedMessage id="loading" /></h1>

}

const ProviderCallbackContainer = connect(null, { login })(ProviderCallback)

export default ProviderCallbackContainer
