import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Config from 'src/gitcms/Config'
import { getEntityList } from 'src/store/actions/gitcms'
// import './EntityList.sass'

const defaultColumns = [ 'id', 'title', 'name', 'slug', 'date' ]

export const EntityList = (props) => {

  const currentType = props.params.entityType

  useEffect(() => {
    if (props.schema.isSuccess) {
      props.getEntityList(currentType)
    }
  }, [currentType, props.schema.isSuccess])

  const handleNew = () => {
    const { entityType, projectId } = props.params
    props.router.push(
      '/project/' + projectId + '/entities/' + entityType + '/new'
    )
  }

  const renderCell = (fieldType, value) => {
    const type = Config.getType(fieldType.type)
    if (!type) return false
    const Viewer = type.view
    return <Viewer value={value} />
  }

  const renderEntityList = (entityType) => {
    const fieldMap = {}
    entityType.fields.forEach((f) => { fieldMap[f.name] = f })
    const columns = (entityType.columns || defaultColumns)
      .filter((c) => fieldMap[c])
    const prefix = '/project/' + props.params.projectId +
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
          {props.entities.value.map((entity) => (
            <tr key={entity.id}>
              <td>
                <Link to={prefix + (entity.id)}>
                  {entity.id}
                </Link>
              </td>
              {columns.map((col) => (
                <td key={col}>
                  {renderCell(fieldMap[col], entity[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  if (props.entities.isLoading) {
    return <FormattedMessage id="loading" />
  }
  if (props.entities.isError) {
    return <FormattedMessage id="entities.error" />
  }
  if (!props.entities.isSuccess) {
    return false
  }

  const entityType = props.schema.value.entities
    .find((e) => e.name === props.params.entityType)
  if (!entityType) {
    return <FormattedMessage id="entities.unknown" />
  }

  return (
    <div id="entities">
      <h1>{entityType.label || entityType.name}</h1>
      <div className="box withTable">
        {renderEntityList(entityType)}
      </div>
      <button type="button" className="new button" onClick={handleNew}>
        <FormattedMessage id="entities.new" />
      </button>
    </div>
  )
}

EntityList.propTypes = {
  schema: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  getEntityList: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  schema: state.projects.currentSchema || {},
  entities: state.projects.currentEntities || {}
})
export default connect(mapStateToProps, { getEntityList })(EntityList)
