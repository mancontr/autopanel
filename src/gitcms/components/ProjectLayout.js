import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Menu from 'src/gitcms/components/Menu'
import { getProject, getSchema, abortSchema } from 'src/store/actions/gitcms'
import './ProjectLayout.sass'

export class ProjectLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    params: PropTypes.object.isRequired,
    getProject: PropTypes.func.isRequired,
    getSchema: PropTypes.func.isRequired,
    abortSchema: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    const projectId = this.props.params.projectId
    this.props.getProject(projectId)
      .then(
        () => this.props.getSchema(projectId),
        () => this.props.abortSchema()
      )
  }

  render = () => (
    <div id="project-wrapper">
      <Menu projectId={this.props.params.projectId} />
      <main>
        {this.props.children}
      </main>
    </div>
  )
}

export default connect(null, {
  getProject, getSchema, abortSchema
})(ProjectLayout)
