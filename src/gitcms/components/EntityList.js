import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Config from 'src/gitcms/Config'
import { getEntityList } from 'src/store/actions/gitcms'
// import './EntityList.sass'

const defaultColumns = [ 'id', 'title', 'name', 'slug', 'date' ]

export class EntityList extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    entities: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    getEntityList: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    if (this.props.schema.isSuccess) {
      this.loadedType = this.props.params.entityType
      this.props.getEntityList(this.loadedType)
    }
  }

  componentDidUpdate = () => {
    if (this.props.schema.isSuccess) {
      const newType = this.props.params.entityType
      if (this.loadedType !== newType) {
        this.loadedType = newType
        this.props.getEntityList(newType)
      }
    }
  }

  handleNew = () => {
    const { entityType, projectId } = this.props.params
    this.props.router.push(
      '/project/' + projectId + '/entities/' + entityType + '/new'
    )
  }

  renderCell = (fieldType, value) => {
    const type = Config.getType(fieldType.type)
    if (!type) return false
    const Viewer = type.view
    return <Viewer value={value} />
  }

  renderEntityList = (entityType) => {
    const fieldMap = {}
    entityType.fields.forEach((f) => { fieldMap[f.name] = f })
    const columns = (entityType.columns || defaultColumns)
      .filter((c) => fieldMap[c])
    const prefix = '/project/' + this.props.params.projectId +
      '/entities/' + entityType.name + '/'
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            {columns.map((col) => (
              <th key={col}>{fieldMap[col].label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.entities.value.map((entity) => (
            <tr key={entity.id}>
              <td>
                <Link to={prefix + (entity.id)}>
                  {entity.id}
                </Link>
              </td>
              {columns.map((col) => (
                <td key={col}>
                  {this.renderCell(fieldMap[col], entity[col])}
                </td>
              ))}
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
        <div className="box withTable">
          {this.renderEntityList(entityType)}
        </div>
        <button type="button" className="new button" onClick={this.handleNew}>
          <FormattedMessage id="entities.new" />
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  schema: state.projects.currentSchema || {},
  entities: state.projects.currentEntities || {}
})
export default connect(mapStateToProps, { getEntityList })(EntityList)
