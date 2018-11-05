import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { getEntityList } from 'src/store/actions/gitcms'
// import './Dashboard.sass'

export class EntityList extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    entities: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    getEntityList: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    if (this.props.schema.isSuccess) {
      this.props.getEntityList(this.props.params.entityType)
    }
  }

  renderEntityList = (entityType) => {
    return (
      <table>
        <tbody>
          {this.props.entities.value.map((entity, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{entity.name || entity.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render = () => {
    if (this.props.entities.isLoading) {
      return <FormattedMessage id="loading" />
    }
    if (this.props.entities.isError) {
      return <FormattedMessage id="entities.error" />
    }
    if (!this.props.entities.isSuccess) {
      return false
    }

    const entityType = this.props.schema.value.entities
      .find((e) => e.name === this.props.params.entityType)
    if (!entityType) {
      return <FormattedMessage id="entities.unknown" />
    }

    return (
      <div id="entities">
        <h1>{entityType.label || entityType.name}</h1>
        <div className="box">
          {this.renderEntityList(entityType)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  schema: state.projects.currentSchema || {},
  entities: state.projects.currentEntities || {}
})
export default connect(mapStateToProps, { getEntityList })(EntityList)
