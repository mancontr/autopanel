import React from 'react'
import PropTypes from 'prop-types'

const DateTypeEditor = ({ field, value, onChange }) => {
  const date = value !== undefined ? new Date(value) : new Date()
  const formattedValue = date.toISOString().substring(0, 16)
  const handleChange = (e) => {
    const newDate = Date.parse(e.target.value + ':00Z')
    onChange(newDate.valueOf())
  }
  return (
    <input type="datetime-local" name={field.name}
      value={formattedValue} onChange={handleChange} />
  )
}

DateTypeEditor.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

const DateTypeViewer = (props) => (
  <span>{new Date(props.value).toLocaleString()}</span>
)

DateTypeViewer.propTypes = {
  value: PropTypes.any
}

export default {
  name: 'date',
  view: DateTypeViewer,
  edit: DateTypeEditor
}
