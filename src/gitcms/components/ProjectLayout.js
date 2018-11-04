import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Menu from 'src/gitcms/components/Menu'
import { setProject } from 'src/store/actions/gitcms'
import './ProjectLayout.sass'

export class ProjectLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    params: PropTypes.object.isRequired
  }

  componentDidMount = () => {
    this.props.setProject(this.props.params.projectId)
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

export default connect(null, { setProject })(ProjectLayout)
