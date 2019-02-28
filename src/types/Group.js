import React from 'react'
import PropTypes from 'prop-types'
import Config from '../Config'
import { EditField } from '../components/EntityEdit'

const GroupTypeEditor = ({ field, value, onChange }) => {
  return field.contents.map((child) =>
    <EditField
      key={child.name}
      field={child}
      value={value && value[child.name]}
      onChange={(v) => onChange({ ...value, [child.name]: v })}
    />
  )
}

GroupTypeEditor.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

const GroupTypeViewer = () => (
  <span>...</span>
)

const preSave = ({ field, value, entity, attachments }) => {
  const valueCopy = { ...value }
  field.contents.forEach((child) => {
    const childFieldType = Config.getType(child.type)
    childFieldType && childFieldType.preSave && childFieldType.preSave({
      field: child,
      value: value[child.name],
      entity: valueCopy, // Tell children that the entity is this sub-entity only
      attachments
    })
  })
  entity[field.name] = valueCopy // In case any child updated it
}

export default {
  name: 'group',
  view: GroupTypeViewer,
  edit: GroupTypeEditor,
  preSave
}
