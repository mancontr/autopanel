import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Menu from 'src/gitcms/components/Menu'
import './ProjectLayout.sass'

export class ProjectLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    params: PropTypes.object.isRequired
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

const mapStateToProps = (state) => ({
  user: state.user.userinfo
})

const ProjectLayoutContainer = connect(mapStateToProps)(ProjectLayout)

export default ProjectLayoutContainer
