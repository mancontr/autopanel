import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
// import './Dashboard.sass'

export class EntityTypes extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired
  }

  renderEntityList = () => {
    const schema = this.props.schema.value
    return (
      <ul className="entities">
        {schema.entities.map((entity) => (
          <li className="entity" key={entity.name}>
            <Link to={'/project/' + this.props.params.projectId + '/entities/' + entity.name}>
              {entity.label || entity.name}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  render = () => (
    <div id="entities">
      <h1><FormattedMessage id="entities" /></h1>
      <div className="box">
        {this.renderEntityList()}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  schema: state.projects.currentSchema || {}
})
export default connect(mapStateToProps)(EntityTypes)
