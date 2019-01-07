import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

import ErrorBoundary from './ErrorBoundary'
import { useGitcms } from '../api'
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

const ProjectList = () => {
  const gitcms = useGitcms()
  const projects = gitcms.getProjects()

  if (projects.length) {
    return (
      <div className="box">
        <div className="projects">
          {projects.map(project => <Project key={project.id} project={project} />)}
        </div>
      </div>
    )
  } else {
    return (
      <div className="box">
        <div><FormattedMessage id="projects.empty" /></div>
        <div><FormattedMessage id="projects.empty2" /></div>
      </div>
    )
  }
}

const ProjectPicker = () => {
  const fallback = <div className="box"><FormattedMessage id="loading" /></div>
  const error = <div className="box"><FormattedMessage id="projects.error" /></div>
  return (
    <main id="project-picker">
      <h1><FormattedMessage id="projects" /></h1>
      <ErrorBoundary fallback={error}>
        <Suspense fallback={fallback}>
          <ProjectList />
        </Suspense>
      </ErrorBoundary>
    </main>
  )
}

export default ProjectPicker
