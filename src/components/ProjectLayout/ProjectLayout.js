import React from 'react'
import PropTypes from 'prop-types'

import { WithAutoPanel } from '../../api'
import Menu from './Menu'
import './ProjectLayout.sass'

export const ProjectLayout = ({ children, projectId }) => {
  return (
    <WithAutoPanel project={projectId}>
      <div id="project-wrapper">
        <Menu projectId={projectId} />
        <main>
          {children}
        </main>
      </div>
    </WithAutoPanel>
  )
}

ProjectLayout.propTypes = {
  children: PropTypes.any,
  projectId: PropTypes.string.isRequired
}

export default ProjectLayout
