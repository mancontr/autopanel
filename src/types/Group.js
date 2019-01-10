import React from 'react'
import PropTypes from 'prop-types'
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

export default {
  name: 'group',
  view: GroupTypeViewer,
  edit: GroupTypeEditor
}
