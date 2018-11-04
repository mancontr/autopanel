import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './Dashboard.sass'

export class Home extends React.Component {
  static propTypes = {
    project: PropTypes.object.isRequired
  }

  render = () => {
    let content = <FormattedMessage id="loading" />

    if (this.props.project.isError) {
      content = <FormattedMessage id="projects.error" />
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

      content = (
        <div className="project">
          <div className="avatar" style={style}>{overlay}</div>
          <div className="info">
            <div className="name">{project.name}</div>
            <div className="description">{project.description}</div>
          </div>
        </div>
      )
    }

    return (
      <div id="dashboard">
        <h1>Dashboard</h1>
        <div className="box">{content}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  project: state.projects.current || {}
})
export default connect(mapStateToProps)(Home)
