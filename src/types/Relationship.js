import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { useAutoPanel } from '../api'

const EntityOption = ({ entity }) => {
  const id = entity.id
  const label = id + ': ' + (entity.name || entity.title)
  return <option value={id}>{label}</option>
}
EntityOption.propTypes = {
  entity: PropTypes.object.isRequired
}

const RelatedEntity = ({ id, entity, onRemove }) => {
  if (!entity) return <li>{id}</li>
  return (
    <li>
      {entity.id}: {entity.name || entity.title}
      <span className="remove-rel" onClick={onRemove}>Remove</span>
    </li>
  )
}
RelatedEntity.propTypes = {
  id: PropTypes.any.isRequired,
  entity: PropTypes.object,
  onRemove: PropTypes.func
}

const RelationshipTypeEditor = ({ field, value, onChange }) => {
  const target = field.targetEntity
  const autopanel = useAutoPanel()
  const entities = autopanel.getEntities(target)
  const lookup = {}
  entities.forEach((e) => { lookup[e.id] = e })

  if (!field.multiple) {
    const handleReplace = (e) => {
      const entity = lookup[e.target.value]
      onChange(entity ? entity.id : null)
    }
    return (
      <select name={field.name} value={value || ''} onChange={handleReplace}>
        {!field.required && (
          <FormattedMessage id="entities.none">
            {(txt) => <option value="">{txt}</option>}
          </FormattedMessage>
        )}
        {entities && entities.map((entity) =>
          <EntityOption key={entity.id} entity={entity} />
        )}
      </select>
    )
  } else {
    const selected = value || []
    const available = entities.filter((e) => selected.indexOf(e.id) === -1)
    const handleAdd = (e) => onChange([ ...selected, lookup[e.target.value].id ])
    const handleRemove = (i) => () => {
      const newList = value.slice()
      newList.splice(i, 1)
      onChange(newList)
    }
    return (
      <div className="field-relationship multiple">
        {!selected.length && (
          <div className="selected empty">
            <FormattedMessage id="relationship.none" />
          </div>
        )}
        {selected.length > 0 && (
          <ul className="selected">
            {selected.map((id, i) =>
              <RelatedEntity key={id} id={id} entity={lookup[id]}
                onRemove={handleRemove(i)} />
            )}
          </ul>
        )}
        <select name={field.name} value="" onChange={handleAdd}
          disabled={available.length === 0}>
          <option disabled hidden value="">Añadir...</option>
          {available.map((entity) =>
            <EntityOption key={entity.id} entity={entity} />
          )}
        </select>
      </div>
    )
  }
}

RelationshipTypeEditor.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func.isRequired
}

const RelationshipTypeViewer = (props) => (
  <span>{props.value}</span>
)

RelationshipTypeViewer.propTypes = {
  value: PropTypes.any
}

export default {
  name: 'relationship',
  view: RelationshipTypeViewer,
  edit: RelationshipTypeEditor
}
