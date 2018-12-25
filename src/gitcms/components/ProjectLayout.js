import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Menu from 'src/gitcms/components/Menu'
import { getProject, getSchema, abortSchema } from 'src/store/actions/gitcms'
import './ProjectLayout.sass'

export const ProjectLayout = (props) => {
  const projectId = props.params.projectId

  useEffect(() => {
    props.getProject(projectId)
      .then(
        () => props.getSchema(projectId),
        () => props.abortSchema()
      )
  }, [projectId])

  return (
    <div id="project-wrapper">
      <Menu projectId={projectId} />
      <main>
        {props.children}
      </main>
    </div>
  )
}

ProjectLayout.propTypes = {
  children: PropTypes.element,
  params: PropTypes.object.isRequired,
  getProject: PropTypes.func.isRequired,
  getSchema: PropTypes.func.isRequired,
  abortSchema: PropTypes.func.isRequired
}

export default connect(null, {
  getProject, getSchema, abortSchema
})(ProjectLayout)
