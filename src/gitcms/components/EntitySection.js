import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

export class EntitySection extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    children: PropTypes.any
  }

  render = () => {
    if (this.props.schema.isLoading) {
      return <FormattedMessage id="loading" />
    }
    if (this.props.schema.isError) {
      return <FormattedMessage id="entities.error" />
    }
    if (this.props.schema.isSuccess) {
      return this.props.children
    }
    return false // Still didn't start to load ?
  }

}

const mapStateToProps = (state) => ({
  schema: state.projects.currentSchema || {}
})
export default connect(mapStateToProps)(EntitySection)
