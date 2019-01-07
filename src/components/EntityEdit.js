import React, { Suspense, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Config from '../Config'
import ErrorBoundary from './ErrorBoundary'
import { WithAutoPanel, useAutoPanel } from '../api'
import './EntityEdit.sass'

export const EntityEdit = (props) => {
  const autopanel = useAutoPanel()
  const id = autopanel.getEntityId()
  const type = autopanel.getEntityType()
  const projectId = autopanel.getProjectId()
  const typeSchema = autopanel.getEntityTypeSchema()
  const currentEntity = autopanel.getEntity() || {}
  const isNew = id === undefined

  const [entity, setEntity] = useState(currentEntity)
  const [modified, setModified] = useState(false)

  const renderFields = () =>
    typeSchema.fields.map((f) => {
      const fieldType = Config.getType(f.type)
      if (!fieldType) return false
      const Editor = fieldType.edit
      return (
        <div className="box field" key={f.name}>
          <div className="label">{f.label || f.name}</div>
          {f.description && (
            <div className="description">{f.description}</div>
          )}
          <Editor field={f}
            value={entity[f.name]}
            onChange={handleChange(f.name)} />
        </div>
      )
    })

  const handleChange = (field) => (value) => {
    setEntity({ ...entity, [field]: value })
    setModified(true)
  }

  const handleSave = () => {
    if (isNew) {
      autopanel.createEntity(entity)
        .then((res) => {
          const newId = res.id
          props.router.push(
            '/project/' + projectId + '/entities/' + type + '/' + newId
          )
        })
    } else {
      autopanel.saveEntity(entity)
        .then(() => setModified(false))
    }
  }

  const handleRemove = () => {
    autopanel.removeEntity()
      .then(() => props.router.push(
        '/project/' + projectId + '/entities/' + type
      ))
  }

  const titleId = 'entities.title.' + (isNew ? 'create' : 'edit')
  const titleValues = {
    type: typeSchema.label || typeSchema.name,
    id: id
  }

  return (
    <div id="entity-edit">
      <h1><FormattedMessage id={titleId} values={titleValues} /></h1>
      {renderFields()}
      <button className="save button" type="button" onClick={handleSave}
        disabled={!modified}>
        <FormattedMessage id={modified ? 'save' : 'saved'} />
      </button>
      {!isNew && (
        <span className="remove" onClick={handleRemove}>
          <FormattedMessage id="remove" />
        </span>
      )}
    </div>
  )
}

EntityEdit.propTypes = {
  router: PropTypes.object.isRequired
}

const EntityEditWrapper = (props) => {
  const currentType = props.params.entityType
  const currentId = props.params.entityId
  const fallback = <div className="box"><FormattedMessage id="loading" /></div>
  const error = <div className="box"><FormattedMessage id="entities.error" /></div>
  return (
    <WithAutoPanel type={currentType} id={currentId}>
      <ErrorBoundary fallback={error}>
        <Suspense fallback={fallback}>
          <EntityEdit router={props.router} />
        </Suspense>
      </ErrorBoundary>
    </WithAutoPanel>
  )
}

EntityEditWrapper.propTypes = {
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
}

export default EntityEditWrapper
