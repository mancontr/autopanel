import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './Dashboard.sass'

export const Dashboard = ({ project, schema }) => {

  const renderAbout = () => {
    if (project.isLoading) {
      return <FormattedMessage id="loading" />
    }
    if (project.isError) {
      return <FormattedMessage id="project.error" />
    }
    if (project.isSuccess) {
      const val = project.value
      const style = {}
      let overlay = false
      if (val.avatar) {
        style.backgroundImage = 'url("' + project.avatar + '")'
      } else {
        overlay = val.name[0].toUpperCase()
      }
      return (
        <div className="project">
          <div className="avatar" style={style}>{overlay}</div>
          <div className="info">
            <div className="name">{val.fullname}</div>
            <div className="description">{val.description}</div>
          </div>
        </div>
      )
    }
  }

  const renderEntities = () => {
    if (project.isLoading || schema.isLoading) {
      return <FormattedMessage id="loading" />
    }
    if (schema.isError) {
      return <FormattedMessage id="project.configured.error" />
    }
    if (schema.isSuccess) {
      return <FormattedMessage id="project.configured.ok"
        values={{ n: schema.value.entities.length }} />
    }
  }

  return (
    <div id="dashboard">
      <h1><FormattedMessage id="dashboard" /></h1>
      <div className="box about">
        {renderAbout()}
      </div>
      <div className="box entities">
        {renderEntities()}
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  project: state.projects.current || {},
  schema: state.projects.currentSchema || {}
})
export default connect(mapStateToProps)(Dashboard)
