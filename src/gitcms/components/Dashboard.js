import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './Dashboard.sass'

export class Dashboard extends React.Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired
  }

  renderAbout = () => {
    if (this.props.project.isLoading) {
      return <FormattedMessage id="loading" />
    }
    if (this.props.project.isError) {
      return <FormattedMessage id="project.error" />
    }
    if (this.props.project.isSuccess) {
      const project = this.props.project.value
      const style = {}
      let overlay = false
      if (project.avatar) {
        style.backgroundImage = 'url("' + project.avatar + '")'
      } else {
        overlay = project.name[0].toUpperCase()
      }
      return (
        <div className="project">
          <div className="avatar" style={style}>{overlay}</div>
          <div className="info">
            <div className="name">{project.fullname}</div>
            <div className="description">{project.description}</div>
          </div>
        </div>
      )
    }
  }

  renderEntities = () => {
    if (this.props.project.isLoading || this.props.schema.isLoading) {
      return <FormattedMessage id="loading" />
    }
    if (this.props.schema.isError) {
      return <FormattedMessage id="project.configured.error" />
    }
    if (this.props.schema.isSuccess) {
      return <FormattedMessage id="project.configured.ok"
        values={{ n: this.props.schema.value.entities.length }} />
    }
  }

  render = () => (
    <div id="dashboard">
      <h1><FormattedMessage id="dashboard" /></h1>
      <div className="box about">
        {this.renderAbout()}
      </div>
      <div className="box entities">
        {this.renderEntities()}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  project: state.projects.current || {},
  schema: state.projects.currentSchema || {}
})
export default connect(mapStateToProps)(Dashboard)
