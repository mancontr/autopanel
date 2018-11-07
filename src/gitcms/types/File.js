import React from 'react'
import PropTypes from 'prop-types'

class FileTypeEditor extends React.Component {

  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any
  }

  render = () => (
    <label>
      {this.props.field.name}
      <input type="file" name={this.props.field.name} />
    </label>
  )

}

const FileTypeViewer = (props) => (
  <a href={props.value}>{props.field.name}</a>
)

FileTypeViewer.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.any
}

export default {
  name: 'file',
  view: FileTypeViewer,
  edit: FileTypeEditor
}
