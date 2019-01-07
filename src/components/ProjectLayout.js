import React from 'react'
import PropTypes from 'prop-types'

import { WithGitcms } from '../api'
import Menu from './Menu'
import './ProjectLayout.sass'

export const ProjectLayout = (props) => {
  const projectId = props.params.projectId
  return (
    <WithGitcms project={projectId}>
      <div id="project-wrapper">
        <Menu projectId={projectId} />
        <main>
          {props.children}
        </main>
      </div>
    </WithGitcms>
  )
}

ProjectLayout.propTypes = {
  children: PropTypes.element,
  params: PropTypes.object.isRequired
}

export default ProjectLayout
