import React from 'react'
import PropTypes from 'prop-types'

let ReactQuill
if (typeof window !== 'undefined') {
  ReactQuill = require('react-quill')
  require('react-quill/dist/quill.snow.css')
}

const WysiwygTypeEditor = ({ field, value, onChange }) => {
  const handleChange = (v) => { v !== value && onChange(v) }
  return <ReactQuill value={value || ''} onChange={handleChange} />
}

WysiwygTypeEditor.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

const WysiwygTypeViewer = (props) => (
  <span>{props.value}</span>
)

WysiwygTypeViewer.propTypes = {
  value: PropTypes.any
}

export default {
  name: 'wysiwyg',
  view: WysiwygTypeViewer,
  edit: WysiwygTypeEditor
}
