import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { useAutoPanel } from '../api'

const RelationshipTypeEditor = ({ field, value, onChange }) => {
  const target = field.targetEntity
  const autopanel = useAutoPanel()
  const entities = autopanel.getEntities(target)

  const handler = (e) => onChange(e.target.value)
  return (
    <select name={field.name} value={value} onChange={handler}>
      {!field.required && (
        <FormattedMessage id="entities.none">
          {(txt) => <option value="">{txt}</option>}
        </FormattedMessage>
      )}
      {entities && entities.map((entity) => {
        const id = entity.id
        const label = '#' + id + ' - ' + (entity.name || entity.title)
        return <option key={id} value={id}>{label}</option>
      })}
    </select>
  )
}

RelationshipTypeEditor.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.string,
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
