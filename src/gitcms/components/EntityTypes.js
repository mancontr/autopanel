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
    const prefix = '/project/' + this.props.params.projectId + '/entities/'
    return (
      <table className="entities">
        <thead>
          <tr>
            <th><FormattedMessage id="entities.entity" /></th>
            <th><FormattedMessage id="entities.description" /></th>
          </tr>
        </thead>
        <tbody>
          {schema.entities.map((entity) => (
            <tr className="entity" key={entity.name}>
              <td>
                <Link to={prefix + entity.name}>
                  {entity.label || entity.name}
                </Link>
              </td>
              <td>
                {entity.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render = () => (
    <div id="entities">
      <h1><FormattedMessage id="entities" /></h1>
      <div className="box withTable">
        {this.renderEntityList()}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  schema: state.projects.currentSchema || {}
})
export default connect(mapStateToProps)(EntityTypes)
