import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import Config from 'src/gitcms/Config'
import {
  getEntity, createEntity, saveEntity, removeEntity
} from 'src/store/actions/gitcms'
import './EntityEdit.sass'

export const EntityEdit = (props) => {

  const { entityId: id, entityType: type, projectId } = props.params
  const isNew = id === undefined

  const typeSchema = props.schema.value.entities.find((e) => e.name === type)
  if (!typeSchema) return <FormattedMessage id="entities.unknown" />

  const [entity, setEntity] = useState({ isLoading: true })
  const [modified, setModified] = useState(false)

  useEffect(() => {
    if (isNew) {
      setEntity({ isSuccess: true, value: {} })
    } else {
      props.getEntity(type, id)
        .then((res) => setEntity({ isSuccess: true, value: res.payload }))
        .catch(() => setEntity({ isError: true }))
    }
  }, [type, id])

  // If we don't have the initial values, don't render anything yet.
  if (entity.isLoading) {
    return <FormattedMessage id="loading" />
  }
  if (entity.isError) {
    return <FormattedMessage id="entities.error" />
  }
  if (!entity.isSuccess || !entity.value) {
    return false
  }

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
            value={entity.value[f.name]}
            onChange={handleChange(f.name)} />
        </div>
      )
    })

  const handleChange = (field) => (value) => {
    setEntity({ ...entity, value: { ...entity.value, [field]: value } })
    setModified(true)
  }

  const handleSave = () => {
    if (isNew) {
      props.createEntity(type, entity.value)
        .then((res) => {
          const newId = res.payload.id
          props.router.push(
            '/project/' + projectId + '/entities/' + type + '/' + newId
          )
        })
    } else {
      props.saveEntity(type, id, entity.value)
        .then(() => setModified(false))
    }
  }

  const handleRemove = () => {
    props.removeEntity(type, id)
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
  schema: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  getEntity: PropTypes.func.isRequired,
  createEntity: PropTypes.func.isRequired,
  saveEntity: PropTypes.func.isRequired,
  removeEntity: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  schema: state.projects.currentSchema || {}
})
export default connect(mapStateToProps, {
  getEntity, createEntity, saveEntity, removeEntity
})(EntityEdit)
