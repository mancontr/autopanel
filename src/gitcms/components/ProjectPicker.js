import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getProjects } from 'src/store/actions/gitcms'
import './ProjectPicker.sass'

const Project = ({ project }) => {
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

Project.propTypes = {
  project: PropTypes.object.isRequired
}

export const ProjectPicker = ({ getProjects, projects }) => {

  useEffect(() => {
    getProjects()
  }, [])

  let content = <FormattedMessage id="loading" />

  if (projects.isError) {
    content = <FormattedMessage id="projects.error" />
  }
  if (projects.isSuccess) {
    const val = projects.value
    if (val.length) {
      content = (
        <div className="projects">
          {val.map(project => <Project key={project.id} project={project} />)}
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

ProjectPicker.propTypes = {
  getProjects: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  projects: state.projects.list || {}
})

export default connect(mapStateToProps, { getProjects })(ProjectPicker)
