import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getProjects } from 'src/store/actions/gitcms'
import './ProjectPicker.sass'

export class ProjectPicker extends React.Component {

  static propTypes = {
    getProjects: PropTypes.func.isRequired,
    projects: PropTypes.object.isRequired
  }

  componentDidMount = () => {
    this.props.getProjects()
  }

  renderProject = (project) => {
    const style = {}
    let overlay = false
    if (project.avatar) {
      style.backgroundImage = 'url("' + project.avatar + '")'
    } else {
      overlay = project.name[0].toUpperCase()
    }
    return (
      <Link to={'/project/' + project.id} className="project" key={project.id}>
        <div className="avatar" style={style}>{overlay}</div>
        <div className="info">
          <div className="name">{project.fullname}</div>
          {project.description && (
            <div className="description">{project.description}</div>
          )}
        </div>
      </Link>
    )
  }

  render = () => {
    let content = <FormattedMessage id="loading" />

    if (this.props.projects.isError) {
      content = <FormattedMessage id="projects.error" />
    }
    if (this.props.projects.isSuccess) {
      const projects = this.props.projects.value
      if (projects.length) {
        content = (
          <div className="projects">
            {projects.map(this.renderProject)}
          </div>
        )
      } else {
        content = (
          <div>
            <div><FormattedMessage id="projects.empty" /></div>
            <div><FormattedMessage id="projects.empty2" /></div>
          </div>
        )
      }
    }

    return (
      <main id="project-picker">
        <h1><FormattedMessage id="projects" /></h1>
        <div className="box">{content}</div>
      </main>
    )
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects.list || {}
})

export default connect(mapStateToProps, { getProjects })(ProjectPicker)
