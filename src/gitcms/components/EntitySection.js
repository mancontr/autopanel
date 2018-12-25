import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

export const EntitySection = ({ schema, children }) => {
  if (schema.isLoading) {
    return <FormattedMessage id="loading" />
  }
  if (schema.isError) {
    return <FormattedMessage id="entities.error" />
  }
  if (schema.isSuccess) {
    return children
  }
  return false // Still didn't start to load ?
}

EntitySection.propTypes = {
  schema: PropTypes.object.isRequired,
  children: PropTypes.any
}

const mapStateToProps = (state) => ({
  schema: state.projects.currentSchema || {}
})
export default connect(mapStateToProps)(EntitySection)
