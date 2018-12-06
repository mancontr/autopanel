import React from 'react'
import PropTypes from 'prop-types'

let ReactQuill
if (__CLIENT__) {
  ReactQuill = require('react-quill')
  require('react-quill/dist/quill.snow.css')
}

class WysiwygTypeEditor extends React.Component {

  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  handleChange = (v) => {
    this.props.onChange(v)
  }

  render = () => {
    const { field, value } = this.props
    return <ReactQuill value={value} onChange={this.handleChange} />
  }

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
