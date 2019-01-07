import React from 'react'
import PropTypes from 'prop-types'

import { WithAutoPanel } from '../api'
import Menu from './Menu'
import './ProjectLayout.sass'

export const ProjectLayout = (props) => {
  const projectId = props.params.projectId
  return (
    <WithAutoPanel project={projectId}>
      <div id="project-wrapper">
        <Menu projectId={projectId} />
        <main>
          {props.children}
        </main>
      </div>
    </WithAutoPanel>
  )
}

ProjectLayout.propTypes = {
  children: PropTypes.element,
  params: PropTypes.object.isRequired
}

export default ProjectLayout
