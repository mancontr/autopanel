import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { callback } from 'src/store/actions/gitcms'

export class ProviderCallback extends React.Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    // Find this provider
    const provider = this.props.params.provider
    this.props.callback(provider, this.props)
      .then(() => this.props.router.replace('/'))
  }

  render = () => <h1><FormattedMessage id="loading" /></h1>

}

export default connect(null, { callback })(ProviderCallback)
