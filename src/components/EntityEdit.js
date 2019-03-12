import React, { Suspense, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Config from '../Config'
import ErrorBoundary from './ErrorBoundary'
import { WithAutoPanel, useAutoPanel } from '../api'
import './EntityEdit.sass'

const coalesce = (...args) => {
  for (let i = 0; i < args.length; i++) {
    if (args[i] !== undefined) return args[i]
  }
  return undefined
}

export const EditField = ({ field, value, onChange }) => {
  const [collapsed, setCollapsed] = useState(field.collapsed || false)

  const fieldType = Config.getType(field.type)
  if (!fieldType) {
    const values = { name: field.name, type: field.type }
    return (
      <div className="field-error">
        <FormattedMessage id="entities.unknown-type" values={values} />
      </div>
    )
  }
  const classes = ['box', 'field', 'field-type-' + field.type]

  let collapseButton = false
  if (coalesce(field.collapsible, fieldType.collapsible)) {
    classes.push(collapsed ? 'collapsed' : 'expanded')
    const handleClick = () => setCollapsed(!collapsed)
    collapseButton = <div className="toggle-collapse" onClick={handleClick} />
  }

  const Editor = fieldType.edit
  return (
    <div className={classes.join(' ')}>
      <div className="header">
        <div className="label">{field.label || field.name}</div>
        {collapseButton}
      </div>
      <div className="content">
        {field.description && (
          <div className="description">{field.description}</div>
        )}
        <Editor field={field}
          value={value}
          onChange={onChange} />
      </div>
    </div>
  )
}

EditField.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
}

export const EntityEdit = () => {
  const autopanel = useAutoPanel()
  const id = autopanel.getEntityId()
  const type = autopanel.getEntityType()
  const projectId = autopanel.getProjectId()
  const typeSchema = autopanel.getEntityTypeSchema()
  const isNew = id === undefined
  const currentEntity = (!isNew && autopanel.getEntity()) || {}

  const [entity, setEntity] = useState(currentEntity)
  const [modified, setModified] = useState(false)

  const handleChange = (field) => (value) => {
    setEntity({ ...entity, [field]: value })
    setModified(true)
  }

  const handleSave = () => {
    const entityCopy = { ...entity }
    const attachments = []

    // Run pre-save hook
    typeSchema.fields.forEach((field) => {
      const fieldType = Config.getType(field.type)
      const value = entityCopy[field.name]
      fieldType && fieldType.preSave && fieldType.preSave({
        field, value, entity: entityCopy, attachments
      })
    })

    // Create or update entity
    if (isNew) {
      autopanel.createEntity(entityCopy, attachments)
        .then((res) => {
          const newId = res.id
          autopanel.go(
            '/project/' + projectId + '/entities/' + type + '/' + newId
          )
        })
    } else {
      autopanel.saveEntity(entityCopy, attachments)
        .then(() => setModified(false))
    }
  }

  const handleRemove = () => {
    autopanel.removeEntity()
      .then(() => autopanel.go('/project/' + projectId + '/entities/' + type))
  }

  const titleId = 'entities.title.' + (isNew ? 'create' : 'edit')
  const titleValues = {
    type: typeSchema.label || typeSchema.name,
    id: id
  }

  return (
    <div id="entity-edit">
      <h1><FormattedMessage id={titleId} values={titleValues} /></h1>
      {typeSchema.fields.map((f) => {
        const error =
          <div className="field-error">
            <FormattedMessage id="entities.field-error" values={f} />
          </div>
        const onChange = handleChange(f.name)
        return (
          <ErrorBoundary key={f.name} fallback={error}>
            <EditField field={f} value={entity[f.name]} onChange={onChange} />
          </ErrorBoundary>
        )
      })}
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

const EntityEditWrapper = ({ entityType, entityId }) => {
  const fallback = <div className="box"><FormattedMessage id="loading" /></div>
  const error = <div className="box"><FormattedMessage id="entities.error" /></div>
  return (
    <WithAutoPanel type={entityType} id={entityId}>
      <ErrorBoundary fallback={error}>
        <Suspense fallback={fallback}>
          <EntityEdit />
        </Suspense>
      </ErrorBoundary>
    </WithAutoPanel>
  )
}

EntityEditWrapper.propTypes = {
  entityType: PropTypes.string.isRequired,
  entityId: PropTypes.string
}

export default EntityEditWrapper
