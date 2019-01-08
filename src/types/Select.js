import React from 'react'
import PropTypes from 'prop-types'

const SelectTypeEditor = ({ field, value, onChange }) => {
  const handler = (e) => onChange(e.target.value)
  return (
    <select name={field.name} value={value} onChange={handler}>
      {field.options.map((option) => {
        if (typeof option === 'string') {
          option = { value: option, label: option }
        }
        const { value, label } = option
        return <option key={value} value={value}>{label}</option>
      })}
    </select>
  )
}

SelectTypeEditor.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

const SelectTypeViewer = (props) => (
  <span>{props.value}</span>
)

SelectTypeViewer.propTypes = {
  value: PropTypes.any
}

export default {
  name: 'select',
  view: SelectTypeViewer,
  edit: SelectTypeEditor
}
