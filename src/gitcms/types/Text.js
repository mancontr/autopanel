import React from 'react'
import PropTypes from 'prop-types'

const TextTypeEditor = ({ field, value, onChange }) => {
  return (
    <input type="text" name={field.name} placeholder={field.placeholder}
      value={value || ''} onChange={(e) => onChange(e.target.value)}
    />
  )
}

TextTypeEditor.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

const TextTypeViewer = (props) => (
  <span>{props.value}</span>
)

TextTypeViewer.propTypes = {
  value: PropTypes.any
}

export default {
  name: 'text',
  view: TextTypeViewer,
  edit: TextTypeEditor
}
