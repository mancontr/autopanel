import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import Config from '../Config'
import ErrorBoundary from './ErrorBoundary'
import { WithAutoPanel, useAutoPanel } from '../api'
// import './EntityList.sass'

const defaultColumns = [ 'id', 'title', 'name', 'slug', 'date' ]

const EntityList = (props) => {
  const autopanel = useAutoPanel()
  const entities = autopanel.getEntities()
  const projectId = autopanel.getProjectId()
  const entityType = autopanel.getEntityType()
  const typeSchema = autopanel.getEntityTypeSchema()

  const handleNew = () => {
    props.router.push(`/project/${projectId}/entities/${entityType}/new`)
  }

  const renderCell = (fieldType, value) => {
    const type = Config.getType(fieldType.type)
    if (!type) return false
    const Viewer = type.view
    return <Viewer value={value} />
  }

  const fieldMap = {}
  typeSchema.fields.forEach((f) => { fieldMap[f.name] = f })
  const columns = (typeSchema.columns || defaultColumns)
    .filter((c) => fieldMap[c])
  const prefix = `/project/${projectId}/entities/${entityType}/`

  return (
    <div id="entities">
      <h1>{typeSchema.label || typeSchema.name}</h1>
      <div className="box withTable">
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
            {entities.map((entity) => (
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
      </div>
      <button type="button" className="new button" onClick={handleNew}>
        <FormattedMessage id="entities.new" />
      </button>
    </div>
  )
}

EntityList.propTypes = {
  router: PropTypes.object.isRequired
}

const EntityListWrapper = (props) => {
  const currentType = props.params.entityType
  const fallback = <div className="box"><FormattedMessage id="loading" /></div>
  const error = <div className="box"><FormattedMessage id="entities.error" /></div>
  return (
    <WithAutoPanel type={currentType}>
      <ErrorBoundary fallback={error}>
        <Suspense fallback={fallback}>
          <EntityList router={props.router} />
        </Suspense>
      </ErrorBoundary>
    </WithAutoPanel>
  )
}

EntityListWrapper.propTypes = {
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
}

export default EntityListWrapper
