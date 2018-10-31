import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Config from '../Config'
import './ProjectPicker.sass'

export class ProjectPicker extends React.Component {

  static propTypes = {
    user: PropTypes.object
  }

  componentDidMount = () => {
    const provider = Config.getProvider(this.props.user.provider)
    provider.getProjects()
      .then((projects) => this.setState({ projects }))
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render = () => (
    <main id="project-picker">
      <h1><FormattedMessage id="projects" /></h1>
      <div className="box">
        {!this.state.projects && <FormattedMessage id="loading" />}
        {this.state.projects && (
          <div className="projects">
            {this.state.projects.map((p) => {
              const style = {}
              let overlay = false
              if (p.avatar) {
                style.backgroundImage = 'url("' + p.avatar + '")'
              } else {
                overlay = p.name[0].toUpperCase()
              }
              return (
                <Link to={'/project/' + p.id} className="project" key={p.id}>
                  <div className="avatar" style={style}>{overlay}</div>
                  <div className="info">
                    <div className="name">{p.fullname}</div>
                    {p.description && (
                      <div className="description">{p.description}</div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.userinfo
})

const ProjectPickerContainer = connect(mapStateToProps)(ProjectPicker)

export default ProjectPickerContainer
